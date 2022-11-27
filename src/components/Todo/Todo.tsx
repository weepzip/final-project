import { useAppDispatch, useAppSelector } from "../../hooks";
import React, { useState } from "react";
import { selectTodoById } from "../../store/todos/selectors";
import s from "./Todo.css";
import { ITodo } from "../../interfaces";
import { updateTodo } from "../../store/todos";

interface TodoProps {
  todoId: string | number;
  dropTarget: HTMLDivElement | null;
  setDragTarget?: (item: ITodo) => void;
}

export const Todo = ({
  todoId,
  dropTarget = null,
  setDragTarget = () => {},
}: TodoProps): JSX.Element | null => {
  const dispatch = useAppDispatch();
  const todo = useAppSelector((state) => selectTodoById(state, { todoId }));
  const todoStatus = todo.completed ? "completed" : "uncompleted";
  const [drag, toggleDrag] = useState<boolean>(false);

  if (!todo) {
    return null;
  }

  const handleDragStart = () => {
    toggleDrag(true);
    setDragTarget(todo);
  };

  const handleDrag = () => {};

  const handleDragEnd = () => {
    toggleDrag(false);

    if (dropTarget?.dataset.element !== todoStatus) {
      dispatch(updateTodo(todo));
    }
  };

  return (
    <div
      className={`${s.todo} ${drag ? s.drag : ""}`}
      draggable={true}
      data-element="todo"
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <span>{todo.title}</span>
    </div>
  );
};
