import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getTopTracks } from '../modules/topTracks';
import { useCallback } from 'react';
import { headerType } from '../modules/topTracks';

export default function useTopTracks() {
  const tracks = useSelector((state: RootState) => state.topTrack);
  const dispatch = useDispatch()

  const getUserTopTracks = useCallback(
    (header:headerType) => dispatch(getTopTracks.request(header)),
    [dispatch]
  )

  return{
    tracks,
    getUserTopTracks
  }
}
