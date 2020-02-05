import { last } from 'lodash';
import querystring from 'querystring';
import config from '../config';

const generateRandomString = function(length: number) {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const authorizeUser = () => {
  const state = generateRandomString(16);
  const query = querystring.stringify({
    client_id: config.SPOTIFY_CLIENT_ID,
    redirect_uri: config.CALLBACK_URL,
    scope: config.SPOTIFY_AUTH_SCOPES,
    response_type: 'token',
    state: state,
    /* This provides protection against attacks such as cross-site request forgery */
  });

  const loginUrl = 'https://accounts.spotify.com/authorize?' + query;
  localStorage.setItem('stateKey', state);
  // document.cookie = `stateKey=${loginOpts.state}`
  window.location.href = loginUrl;
};

export const parseAccessToken = () => {
  const url = window.location.href;
  const urlParts = url.split('#access_token=');
  return String(last(urlParts));
};

export const parseState = () => {
  const url = window.location.href;
  const parsedUrl = querystring.parse(url);
  return parsedUrl.state;
};

export const getAuthHeader = (token: string) => {
  return { Authorization: `Bearer ${token}` };
};

// export const getAuthHeader = (token: string) => {
//   // if (token) {
//     return { Authorization: `Bearer ${token}` };
//   // }

//   return {};
// };
