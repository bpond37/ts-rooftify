import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getRecentTracks } from '../modules/recentTracks';
import { useCallback } from 'react';
import { headerType } from '../modules/recentTracks';

export default function useRecentTracks() {
  const recentTracks = useSelector((state: RootState) => state.recentTrack);
  const dispatch = useDispatch()

  const getUserRecentTracks = useCallback(
    (header:headerType) => dispatch(getRecentTracks.request(header)),
    [dispatch]
  )

  return{
    recentTracks,
    getUserRecentTracks
  }
}
