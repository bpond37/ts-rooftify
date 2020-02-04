import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../modules'
import { getTopArtists } from '../modules/topArtists'
import { useCallback } from 'react'
import { headerType } from '../modules/topArtists'

export default function useTopArtists(){
  const artists = useSelector((state:RootState)=> state.topArtist)
  const dispatch = useDispatch()

  const getUserTopArtists = useCallback(
    (header:headerType)=> dispatch(getTopArtists.request(header)),
    [dispatch]
  )

  return{
    artists,
    getUserTopArtists
  }
}