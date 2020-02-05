import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const CardDiv = styled.div`
  /* height: 100%; */
  /* display: flex; */
  padding-top: 10px;
  background: ${palette.gray[9]};
  border-radius: 8px;
  position: relative;
  flex-direction: row;
  padding: 20px 20px 16px;

  color: white;
  flex-direction: column;
  margin-bottom: 16;
`;

const CardImgDiv = styled.div`
  height: 0;
  width: 100%;
  padding-top: 100%;
  position: relative;
  margin-bottom: 16px;
  background-color: #333;
  border-radius: 50%;
`;

const CardImg = styled.img`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  :hover {
    opacity: 80%;
  }
`;

const CardName = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  letter-spacing: 0.24px;
  overflow: hidden;
  /* font-style: */
`;

const CardType = styled.div`
  font-size: 12px;
  line-height: 18px;
  text-overflow: ellipsis;
  color: ${palette.gray[3]};
  margin-top: 4px;
`;

type CardProps = {
  imgUrl: string;
  name: string;
  type: string;
  href: string;
};

function Card({ imgUrl, name, type, href }: CardProps) {
  // const imgUrl = artist.images[0].url

  return (
    <CardDiv>
      <CardImgDiv>
        <a href={href} target="_blank">
          <CardImg src={imgUrl} width={100} height={'auto'} alt={'img'} />
        </a>
      </CardImgDiv>
      <CardName>{name}</CardName>
      <CardType>{type}</CardType>
    </CardDiv>
  );
}

export default Card;
