import {
  selectCompletedTodosIds,
  selectUncompletedTodosIds,
} from "./selectors";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { LoadingStatuses } from "../../constants/LoadingStatuses";
import { ITodo } from "../../interfaces/index";
import axios from "axios";
import { RootState } from "store";

type Entities = {
  [key: string | number]: ITodo;
};

type TodosState = {
  status: string;
  todoStatus: string;
  completedIds: (string | number)[];
  uncompletedIds: (string | number)[];
  entities: {
    [key: string | number]: ITodo;
  };
};

export const fetchTodos = createAsyncThunk<
  ITodo[],
  void,
  { state: RootState; rejectValue: string }
>("todos/fetchTodos", async (_, { getState, rejectWithValue }) => {
  if (
    selectCompletedTodosIds(getState()).length ||
    selectUncompletedTodosIds(getState()).length
  ) {
    return rejectWithValue(LoadingStatuses.earlyAdded);
  }

  const response = await axios.get<ITodo[]>(
    `https://jsonplaceholder.typicode.com/todos?_limit=10`
  );

  if (response.status !== 200) {
    return rejectWithValue(LoadingStatuses.failed);
  }

  return response.data as ITodo[];
});

export const updateTodo = createAsyncThunk<
  ITodo,
  ITodo,
  { state: RootState; rejectValue: string }
>("todos/updateTodo", async (todo, { getState, rejectWithValue }) => {
  if (!todo) {
    return rejectWithValue(LoadingStatuses.failed);
  }

  const response = await axios.patch<ITodo>(
    `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...todo, completed: !todo.completed }),
    }
  );

  if (response.status !== 200) {
    console.log(response.statusText);
    return rejectWithValue(LoadingStatuses.failed);
  }

  return todo as ITodo;
});

const todosEntityAdaptar = createEntityAdapter<ITodo>();

const initialState: TodosState = {
  status: LoadingStatuses.idle,
  todoStatus: LoadingStatuses.idle,
  completedIds: [],
  uncompletedIds: [],
  entities: {},
};

export const todosSlice = createSlice({
  name: "todos",
  initialState /* : todosEntityAdaptar.getInitialState({
    status: LoadingStatuses.inProgress,
  }) */,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchTodos.fulfilled, (state, { payload }) => {
        // todosEntityAdaptar.addMany(state, payload);
        state.completedIds = payload
          .filter(({ completed }) => completed)
          .map(({ id }) => id);
        state.uncompletedIds = payload
          .filter(({ completed }) => !completed)
          .map(({ id }) => id);

        const entities: Entities = {};

        payload.forEach((todo) => {
          entities[todo.id] = todo;
        });

        state.entities = entities;

        state.status = LoadingStatuses.success;
      })
      .addCase(fetchTodos.rejected, (state, { payload }) => {
        const { success, failed, earlyAdded } = LoadingStatuses;

        state.status = payload === earlyAdded ? success : failed;
      })

      .addCase(updateTodo.pending, (state) => {
        state.todoStatus = LoadingStatuses.inProgress;
      })
      .addCase(updateTodo.fulfilled, (state, { payload }) => {
        state.entities[payload.id].completed = !payload.completed;

        if (payload.completed) {
          state.completedIds = state.completedIds.filter(
            (id) => id !== payload.id
          );
          state.uncompletedIds = [...state.uncompletedIds, payload.id];
        } else {
          state.uncompletedIds = state.uncompletedIds.filter(
            (id) => id !== payload.id
          );
          state.completedIds = [...state.completedIds, payload.id];
        }

        state.todoStatus = LoadingStatuses.success;
      })
      .addCase(updateTodo.rejected, (state, { payload }) => {
        state.todoStatus = LoadingStatuses.failed;
      });
  },
});
