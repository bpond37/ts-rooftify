import client from './client'

export const getUserInfo = (header: any) => client.get('/me',{headers: header})

export const getUserTopArtists = (header: any) => client.get('/me/top/artists?time_range=medium_term&limit=12&offset=5',{headers: header})

export const getUserTopTracks = (header: any) => client.get('/me/top/tracks?time_range=medium_term&limit=12&offset=5',{headers: header})

export const getUserRecentlyPlayedTracks = (header: any) => client.get('/me/player/recently-played?type=track&limit=12',{headers: header})