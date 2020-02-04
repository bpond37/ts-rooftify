import React from 'react'
import styled from 'styled-components'
import img from '../../lib/Icons/album1.png'
import palette from '../../lib/styles/palette'

const ItemDiv = styled.div`
  /* height: 100%; */
  /* display: flex; */
  padding-top : 10px;
  background: ${palette.gray[9]};
  border-radius : 8px;
  position: relative;
  flex-direction: row;
  padding: 20px 20px 16px;

  color: white;
  flex-direction: column;
  margin-bottom: 16;
`

const ItemName = styled.div`
  font-size : 14px;
  line-height: 20px;
  font-weight: 700;
  letter-spacing: 0.24px;
  overflow:hidden;
  /* font-style: */
`

const ItemContents = styled.div`
  font-size: 12px;
  line-height: 18px;
  text-overflow: ellipsis;
  color: ${palette.gray[3]};
  margin-top: 4px;

`

export default function Item ({name, contents}:any){

  return(
      <ItemDiv>
        <img src={img} width={'100%'} height={'auto'} alt={'img'}></img>
        <ItemName>{name}</ItemName>
        <ItemContents>{contents}</ItemContents>
      </ItemDiv>
  )

}