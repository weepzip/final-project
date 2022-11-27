import { selectAlbumsIds, selectAlbumById } from "./selectors";
import axios from "axios";
import { RootState } from "./../index";
import { LoadingStatuses } from "./../../constants/LoadingStatuses";
import { IAlbum } from "./../../interfaces/index";
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

export const fetchAlbums = createAsyncThunk<
  IAlbum[],
  void,
  { state: RootState; rejectValue: string }
>("albums/fetchAlbums", async (_, { getState, rejectWithValue }) => {
  /* if (selectAlbumsIds(getState()).length) {
    return rejectWithValue(LoadingStatuses.earlyAdded);
  } */

  const response = await axios.get<IAlbum[]>(
    `https://jsonplaceholder.typicode.com/albums?_limit=10`
  );

  if (response.status !== 200) {
    return rejectWithValue(LoadingStatuses.failed);
  }

  return response.data as IAlbum[];
});

export const fetchAlbum = createAsyncThunk<
  IAlbum,
  string,
  { state: RootState; rejectValue: string }
>("albums/fetchAlbum", async (albumId, { getState, rejectWithValue }) => {
  if (!albumId) {
    return rejectWithValue(LoadingStatuses.failed);
  }

  /* if (!!selectAlbumById(getState(), { albumId })) {
    return rejectWithValue(LoadingStatuses.earlyAdded);
  } */

  const response = await axios.get<IAlbum>(
    `https://jsonplaceholder.typicode.com/albums/${albumId}`
  );

  if (response.status !== 200) {
    return rejectWithValue(LoadingStatuses.failed);
  }

  return response.data as IAlbum;
});

const albumsEntityAdapter = createEntityAdapter<IAlbum>();

export const albumsSlice = createSlice({
  name: "albums",
  initialState: albumsEntityAdapter.getInitialState({
    status: LoadingStatuses.idle,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchAlbums.fulfilled, (state, { payload }) => {
        albumsEntityAdapter.addMany(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchAlbums.rejected, (state, { payload }) => {
        const { success, failed, earlyAdded } = LoadingStatuses;

        state.status = payload === earlyAdded ? success : failed;
      })
      .addCase(fetchAlbum.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchAlbum.fulfilled, (state, { payload }) => {
        albumsEntityAdapter.addOne(state, payload);
        state.status = LoadingStatuses.success;
      })
      .addCase(fetchAlbum.rejected, (state, { payload }) => {
        const { earlyAdded, success, failed } = LoadingStatuses;

        state.status = payload === earlyAdded ? success : failed;
      });
  },
});
