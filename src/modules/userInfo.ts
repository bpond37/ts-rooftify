import { createAsyncAction, createReducer } from 'typesafe-actions';
import { put, call, takeEvery, all } from 'redux-saga/effects';
import * as api from '../lib/api/auth';

export type headerType = {
  Authorization: string;
};

export type User = {
  country?: string;
  display_name?: string;
  email?: string;
  loading?: string;
  id?: string;
};

export type getUserState = {
  user: User;
};

export const getUser = createAsyncAction(
  'GET_USER',
  'GET_USER_SUCCESS',
  'GET_USER_FAILURE',
)<headerType, User, Error>();

type userAction = ReturnType<typeof getUser.request>;

const initialState: getUserState = {
  user: {},
};

function* getUserSaga(action: userAction): Generator {
  try {
    const response: any = yield call(api.getUserInfo, action.payload);
    yield put(getUser.success(response.data));
  } catch (e) {
    yield put(getUser.failure(e));
  }
}

export function* userSaga() {
  yield all([takeEvery(getUser.request, getUserSaga)]);
}

export const userInfo = createReducer<
  getUserState,
  ReturnType<typeof getUser.success>
>(initialState).handleAction(
  getUser.success,
  (state: getUserState, action: { payload: User }) => ({
    ...state,
    user: action.payload,
  }),
);

export default userInfo;
