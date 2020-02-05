import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getUser } from '../modules/userInfo';
import { useCallback } from 'react';
import { headerType } from '../modules/userInfo';

export default function useUserInfo() {
  const user = useSelector((state: RootState) => state.userInfo.user);
  const dispatch = useDispatch();

  const getUserInfo = useCallback(
    (header: headerType) => dispatch(getUser.request(header)),
    [dispatch],
  );

  return {
    user,
    getUserInfo,
  };
}
