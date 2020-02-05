import { createAsyncAction, createReducer } from 'typesafe-actions';
import { put, call, takeEvery, all } from 'redux-saga/effects';
import * as api from '../lib/api/auth';
import { Album, Track } from './topTracks';

export type headerType = {
  Authorization: string;
};

export type recentTrack = {
  track: Track;
  played_at: string;
  context: null;
};

export type payloadType = {
  items: recentTrack[];
};

export type recentTrackState = {
  items: payloadType;
};

export const getRecentTracks = createAsyncAction(
  'GET_RECENT_TRACKS',
  'GET_RECENT_TRACKS_SUCCESS',
  'GET_RECENT_TRACKS_FAILURE',
)<headerType, payloadType, Error>();

type recentTrackAction = ReturnType<typeof getRecentTracks.request>;

const initialState: recentTrackState = {
  items: {
    items: [],
  },
};

function* getRecentTracksSaga(action: recentTrackAction): Generator {
  try {
    const response: any = yield call(
      api.getUserRecentlyPlayedTracks,
      action.payload,
    );
    yield put(getRecentTracks.success(response.data));
  } catch (e) {
    yield put(getRecentTracks.failure(e));
  }
}

export function* recentTrackSaga() {
  yield all([takeEvery(getRecentTracks.request, getRecentTracksSaga)]);
}

export const recentTrack = createReducer<
  recentTrackState,
  ReturnType<typeof getRecentTracks.success>
>(initialState).handleAction(
  getRecentTracks.success,
  (state: recentTrackState, action: { payload: payloadType }) => ({
    ...state,
    items: action.payload,
  }),
);

export default recentTrack;
