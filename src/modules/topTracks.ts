import {
  createAsyncAction,
  createReducer,
} from 'typesafe-actions'
import { put, call, takeEvery, all } from 'redux-saga/effects';
import * as api from '../lib/api/auth'
import { Artist, externalUrls} from './topArtists'

export type headerType = {
  Authorization: string
}

export type image ={
  height: number;
  width :number;
  url: string
}

export type Album = {
  album_type: string
  artists: Artist[]
  external_urls:externalUrls
  href: string;
  id: string;
  images: image[]
  name: string
  release_date: string
  total_tracks: number
  type: string
  uri: string
}

export type Track ={
  album: Album
  artists: Artist[] 
  images : image[]
  genres?: string[]
  href?: string
  external_urls: externalUrls
  id?: string
  name: string
  popularity?: number
  preview_url:string
  type: string
  uri?: string
}

export type payloadType ={
  items : Track[]
}

export type topTrackState = {
  items: payloadType
}

export const getTopTracks = createAsyncAction(
  'GET_TOP_TRACKS',
  'GET_TOP_TRACKS_SUCCESS',
  'GET_TOP_TRACKS_FAILURE'
)<headerType, payloadType, Error>();

type topTracksAction = ReturnType<typeof getTopTracks.request>

const initialState:topTrackState ={
  items : {
      items : []
  }
}

function* getTopTracksSaga(action: topTracksAction):Generator{
  try {
    const response: any = yield call(api.getUserTopTracks, action.payload)
    yield put(getTopTracks.success(response.data))
  } catch (e) {
    yield put(getTopTracks.failure(e))
  }
}

export function* topTracksSaga(){
  yield all([
    takeEvery(getTopTracks.request, getTopTracksSaga)
  ])
}

export const topTrack = createReducer<topTrackState, ReturnType<typeof getTopTracks.success>>(initialState)
.handleAction(getTopTracks.success, (state:topTrackState, action:{payload:payloadType})=>({...state, items: action.payload}))

export default topTrack