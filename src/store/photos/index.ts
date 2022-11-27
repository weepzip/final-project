import { RootState } from "./../index";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { IPhoto } from "./../../interfaces/index";
import { selectPhotosAlbumId } from "./selectors";
import { LoadingStatuses } from "./../../constants/LoadingStatuses";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPhotos = createAsyncThunk<
  IPhoto[],
  string,
  { state: RootState; rejectValue: string }
>("photos/fetchPhotos", async (albumId, { getState, rejectWithValue }) => {
  if (selectPhotosAlbumId(getState()) === albumId) {
    return rejectWithValue(LoadingStatuses.earlyAdded);
  }

  const response = await axios.get<IPhoto[]>(
    `https://jsonplaceholder.typicode.com/albums/${albumId}/photos?_limit=10`
  );

  if (response.status !== 200) {
    return rejectWithValue(LoadingStatuses.failed);
  }

  return response.data as IPhoto[];
});

const photosAdapter = createEntityAdapter<IPhoto>();

export const photosSlice = createSlice({
  name: "photos",
  initialState: photosAdapter.getInitialState({
    status: LoadingStatuses.idle,
    albumId: "" as string | number,
    sliderIsOpened: false,
    currentPhotoId: "" as string | number,
  }),
  reducers: {
    toggleSlider(state) {
      return {
        ...state,
        sliderIsOpened: !state.sliderIsOpened,
      };
    },
    setCurrentPhotoId: (state, { payload }) => {
      state.currentPhotoId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = LoadingStatuses.inProgress;
      })
      .addCase(fetchPhotos.fulfilled, (state, { payload }) => {
        photosAdapter.removeAll(state);
        photosAdapter.addMany(state, payload);

        state.status = LoadingStatuses.success;
        state.albumId = payload[0].albumId;
      })
      .addCase(fetchPhotos.rejected, (state, { payload }) => {
        const { earlyAdded, success, failed } = LoadingStatuses;

        state.status = payload === earlyAdded ? success : failed;
      });
  },
});

export const { toggleSlider, setCurrentPhotoId } = photosSlice.actions;
