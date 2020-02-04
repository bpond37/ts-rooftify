import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useTopArtists from '../../hooks/useTopArtists';
import useTopTracks from '../../hooks/useTopTracks';
import { getAuthHeader, parseAccessToken, parseState } from '../../lib/auth';
import ArtistCard from '../Card';
import useUserInfo from '../../hooks/useUserInfo';
import useRecentTracks from '../../hooks/useRecentTracks';

const SectionDiv = styled.section`
  display: block;
  color: white;
  
  font-size: 2em;
  font-weight: 600;
  padding: 16px;
  flex: 1;
  height: 100%;
  /* overflow-y: scroll; */
`;

const CardLists = styled.div`
  padding-top: 16px;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(164px, 1fr));
`;

type selectedProps = {
  selected: string;
};

function Home({ selected }: selectedProps) {
  
  const { recentTracks, getUserRecentTracks } = useRecentTracks()
  const { artists, getUserTopArtists } = useTopArtists();
  const { tracks, getUserTopTracks } = useTopTracks();
  const { user } = useUserInfo()

  const accessArtistsAndTracks = () => {
    const state = parseState();
    const storedState = localStorage.getItem('stateKey');
    const accessToken = parseAccessToken();
    if (accessToken && (state == null || state !== storedState)) {
      // alert('There was an error during the authentication');
    } else {
      // localStorage.removeItem('stateKey');
      if (accessToken) {
        const header = getAuthHeader(accessToken);
        getUserRecentTracks(header);
        getUserTopArtists(header);
        getUserTopTracks(header);
      }
    }
  };

  useEffect(() => {
    accessArtistsAndTracks();
  }, []);

  if (selected === 'artist') {
    const { items } = artists.items;
    console.log(artists.items.items);

    return (
      <SectionDiv>
        {/* {selected} */}
        {items[0]
          ? user.display_name + `'s Top Artists`
          : 'need to login'}

        <CardLists>
          {items[0]
            ? items.map(v => (
                <ArtistCard
                  key={v.id}
                  imgUrl={v.images[2].url}
                  name={v.name}
                  type={v.type}
                  href={v.external_urls.spotify}
                />
              ))
            : // <ArtistCard imgUrl={items[0].images[0].url} name={items[0].name} type={items[0].type}/>
              ''}
        </CardLists>
      </SectionDiv>
    );
  } else if (selected === 'track') {
    const { items } = tracks.items;
    console.log(tracks.items.items);
    return (
      <SectionDiv>
        {/* {selected} */}
        {items[0] ? user.display_name + `'s Top Tracks` : 'need to login'}

        <CardLists>
          {items[0]
            ? items.map(v => (
                <ArtistCard
                  key={v.id}
                  imgUrl={
                    v.type === 'artist'
                      ? v.images[2].url
                      : v.album.images[0].url
                  }
                  name={v.name}
                  type={v.type}
                  href={
                    v.type === 'artist'
                      ? v.external_urls.spotify
                      : v.album.external_urls.spotify
                  }
                />
              ))
            : // <ArtistCard imgUrl={items[0].images[0].url} name={items[0].name} type={items[0].type}/>
              ''}
        </CardLists>
      </SectionDiv>
    );
  } else if(selected ==='recent'){
    const { items } = recentTracks.items;
    console.log(recentTracks.items.items);
    return (
      <SectionDiv>
        {/* {selected} */}
        {items[0] ? user.display_name + `'s Recently Played Tracks` : 'need to login'}

        <CardLists>
          {items[0]
            ? items.map(v => (
                <ArtistCard
                  key={v.played_at}
                  imgUrl={v.track.album.images[0].url
                  }
                  name={v.track.name}
                  type={v.track.type}
                  href={v.track.album.external_urls.spotify
                  }
                />
              ))
            : // <ArtistCard imgUrl={items[0].images[0].url} name={items[0].name} type={items[0].type}/>
              ''}
        </CardLists>
      </SectionDiv>
    );
  } else {
    return <></>;
  }
}

export default Home;
