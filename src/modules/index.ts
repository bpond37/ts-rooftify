import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
// import loading from './loading'
import userInfo, { userSaga } from './userInfo';
import topArtist, { topArtistsSaga } from './topArtists';
import topTrack, { topTracksSaga } from './topTracks';
import recentTrack, { recentTrackSaga } from './recentTracks';

const rootReducer = combineReducers({
  userInfo,
  topArtist,
  topTrack,
  recentTrack,
});

export function* rootSaga() {
  yield all([userSaga(), topArtistsSaga(), topTracksSaga(), recentTrackSaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
