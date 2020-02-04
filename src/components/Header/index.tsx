import React, { useEffect } from 'react';
import styled from 'styled-components';
import { authorizeUser } from '../../lib/auth';
import useUserInfo from '../../hooks/useUserInfo';
import { parseAccessToken, getAuthHeader, parseState } from '../../lib/auth';
import config from '../../config';

function Header() {
  const { user, getUserInfo } = useUserInfo();
  useEffect(() => {
    accessUserInfo();
  }, []);

  const accessUserInfo = () => {
    const state = parseState();
    const storedState = localStorage.getItem('stateKey');
    const accessToken = parseAccessToken();
    if (accessToken && (state == null || state !== storedState)) {
      // alert('There was an error during the authentication');
    } else {
      // localStorage.removeItem('stateKey');
      if (accessToken) {
        const header = getAuthHeader(accessToken);
        getUserInfo(header);
      }
    }
  };

  console.log(user, getUserInfo);
  console.log('user', user);

  const handleLogin = () => {
    authorizeUser();
  };

  const handleLogout = () => {
    window.location.href = 'https://rooftify.herokuapp.com/';
    localStorage.clear();
  };

  return (
    <HeaderBlock>
      {user.display_name ? (
        <Button className="userInfo">{user.display_name}</Button>
      ) : (
        ''
      )}
      {user.display_name ? (
        <Button onClick={handleLogout}>LOG OUT</Button>
      ) : (
        <Button onClick={handleLogin}>LOG IN</Button>
      )}
    </HeaderBlock>
  );
}

export default Header;

const HeaderBlock = styled.div`
  /* height: 64px; */
  display: flex;
  padding: 16px 24px;
  position: relative;
  align-items: center;
  justify-content: flex-end;
  /* max-height: 80; */
  /* width: 100% */
  -webkit-box-pack: justify;
`;

const Button = styled.button`
  font-size: 12;
  line-height: 18px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  border: 0;
  border-radius: 500px;
  padding: 8px 34px;
  font-family: spotify-circular, spotify-circular-cyrillic,
    spotify-circular-arabic, spotify-circular-hebrew, Helvetica Neue, Helvetica,
    Arial, Hiragino Kaku Gothic Pro, Meiryo, MS Gothic, sans-serif;
  &.userInfo {
    background: gray;
    padding: 4px 17px;
  }
`;
