import ENV from '../env'

const config = {
  API_URL: 'https://api.spotify.com/v1',
  SPOTIFY_AUTHORIZE_URL: 'https://accounts.spotify.com/authorize',
  SPOTIFY_CLIENT_ID: ENV.client_id,
  CALLBACK_URL: `${window.location.origin}/callback`,
  SPOTIFY_AUTH_SCOPES: 'user-read-recently-played user-top-read playlist-modify-public streaming user-read-email user-read-private',
  DEFAULT_COUNTRY_CODE: 'US',
}

export default config;