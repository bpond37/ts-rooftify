import {
  createAsyncAction,
  createReducer,
} from 'typesafe-actions'
import { put, call, takeEvery, all } from 'redux-saga/effects';
import * as api from '../lib/api/auth'

export type externalUrls={
  spotify:string;
}

export type headerType = {
  Authorization: string
}

export type image ={
  height: number;
  width :number;
  url: string
}

export type Artist ={
  external_urls: externalUrls
  followers? : {}
  images : image[]
  genres?: string[]
  href: string
  id?: string
  name: string
  popularity?: number
  type: string
  uri?: string
}

export type payloadType ={
  items : Artist[]
}

export type topArtistState = {
  items: payloadType
}



export const getTopArtists = createAsyncAction(
  'GET_TOP_ARTIST',
  'GET_TOP_ARTIST_SUCCESS',
  'GET_TOP_ARTIST_FAILURE'
)<headerType, payloadType, Error>();

type topArtistsAction = ReturnType<typeof getTopArtists.request>

const initialState:topArtistState ={
  items : {
      items : []
  }
}

function* getTopArtistsSaga(action: topArtistsAction):Generator{
  try {
    const response:any = yield call(api.getUserTopArtists, action.payload)
    yield put(getTopArtists.success(response.data))
  } catch (e) {
    yield put(getTopArtists.failure(e))
  }
}

export function* topArtistsSaga(){
  yield all([
    takeEvery(getTopArtists.request, getTopArtistsSaga)
  ])
}

export const topArtist = createReducer<topArtistState, ReturnType<typeof getTopArtists.success>>(initialState)
.handleAction(getTopArtists.success, (state:topArtistState, action:{payload:payloadType}) =>({...state, items: action.payload}))

export default topArtist