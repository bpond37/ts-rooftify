import React,{useState} from 'react'
import Home from '../components/Home'
import SideBar from '../components/SideBar'
import styled from 'styled-components'
import Header from '../components/Header'

const StyledDiv = styled.div`
  &.panes{
    height : calc(100vh);
    display : flex;
    background : black;
    @media(max-width:768px){
    display:block;
    }
  }
  &.pane{
    display:flex;
    flex:1;
    flex-direction: column;
    padding-top: 10px;
    /* justify-content: center; */
    /* align-items: center; */
    text-align :center;
    height: 100%;
    overflow-y: scroll;

  }
  &.sideBar{
    display:flex;
    flex:1;
    padding-top: 10px;
    /* justify-content: center; */
    /* align-items: center; */
    text-align :center;
    @media(max-width:768px){
    display:none;
  }
  }
  &.seperator{
    width:1rem;
    height:100%;
    position:absolute;
    transform : translate(-50%);
    cursor: col-resize;

  }
`




function Panes (){
  const [leftPercentage, setLeftPercentage] = useState(0.15)
  const [selected, setSelected]= useState('recent')

  const leftStyle = {
    flex: leftPercentage
  }
  const rightStyle = {
    flex: 1-leftPercentage
  }

  return (
    <StyledDiv className='panes'>
      <StyledDiv className='sideBar' style={leftStyle}>
        <SideBar setSelected = {setSelected}/>
      </StyledDiv>
      <StyledDiv className='pane' style={rightStyle}>
        <Header/>
        <Home selected = {selected}/>
      </StyledDiv>
    </StyledDiv>


  )
}

export default Panes