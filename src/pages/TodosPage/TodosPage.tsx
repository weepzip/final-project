import { useAppDispatch, useAppSelector } from "../../hooks";
import React, { useEffect, useState } from "react";
import {
  selectCompletedTodosIds,
  selectIsTodosLoading,
  selectTodosModuleState,
  selectUncompletedTodosIds,
} from "../../store/todos/selectors";
import { fetchTodos } from "../../store/todos";
import s from "./TodosPage.css";
import { Todo } from "../../components/Todo/Todo";
import { ITodo } from "../../interfaces/index";

export const TodosPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsTodosLoading);
  const completed = useAppSelector(selectCompletedTodosIds);
  const uncompleted = useAppSelector(selectUncompletedTodosIds);
  const [dragTarget, setDragTarget] = useState<ITodo | null>(null);
  const [dropTarget, setDropTarget] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    const dropTarget = e.currentTarget;
    const { classList } = dropTarget;

    setDropTarget(dropTarget || null);

    if (classList.contains(s.uncompleted)) {
      classList.add(s.dropzone);
    }

    if (classList.contains(s.completed)) {
      classList.add(s.dropzone);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    const { classList } = e.currentTarget;

    setDragTarget(null);

    if (classList.contains(s.uncompleted)) {
      classList.remove(s.dropzone);
    }

    if (classList.contains(s.completed)) {
      classList.remove(s.dropzone);
    }
  };

  return (
    <div className={s.todos}>
      <div
        className={s.uncompleted}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        data-element="uncompleted"
      >
        <div className={s.header}>
          <h2>Uncompleted todos</h2>
        </div>
        <div className={s.body}>
          {!uncompleted.length ? (
            <div>Drop to add...</div>
          ) : (
            uncompleted.map((id) => (
              <Todo
                key={id}
                todoId={id}
                setDragTarget={setDragTarget}
                dropTarget={dropTarget}
              />
            ))
          )}
        </div>
      </div>
      <div
        className={s.completed}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        data-element="completed"
      >
        <div className={s.header}>
          <h2>Completed todos</h2>
        </div>
        <div className={s.body}>
          {!completed.length ? (
            <div>Drop to add...</div>
          ) : (
            completed.map((id) => (
              <Todo
                key={id}
                todoId={id}
                setDragTarget={setDragTarget}
                dropTarget={dropTarget}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
