import React from 'react'
import logo from '../../lib/Icons/Spotify_Icon.png'
import styled from 'styled-components'

const StyledDiv = styled.div`
  width: 100%;
  flex-direction: row;

`

const Button = styled.div`
  text-align :center;
  color : gray;
  padding-top : 20px;
  &:hover {
    animation-delay : 1000;
    color: white; 
    cursor: pointer
  }
`

const Icon = styled.div`
  display:flex;
  flex-direction: row;
  padding: 10px;
  text-align: center;
  color:white;
  align-items:center;
  flex-direction: row;
  justify-content: space-evenly;

`

type SideBarProps = {
  setSelected : React.Dispatch<React.SetStateAction<string>>
}

function SideBar ({setSelected}:SideBarProps){

  const handleClick = (target:string)=>{
    setSelected(target)
  }
  return (
    <StyledDiv>
      <Icon>
        <img src={logo} width={40} height={'auto'} alt={'logo'}/>
        <h3>ROOFTIFY</h3>
      </Icon>
      <div>
        {/* <path fill={logo}/> */}
        <Button onClick = {()=>handleClick('recent')}> Recently Played </Button>
        <Button onClick = {()=>handleClick('artist')}> Top Artists </Button>
        <Button onClick = {()=>handleClick('track')}> Top Tracks </Button>
      </div>
    </StyledDiv>
  )
}

export default SideBar