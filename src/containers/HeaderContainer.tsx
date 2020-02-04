import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "../modules"
import { getUser, headerType } from '../modules/userInfo'
import Header from '../components/Header'
import { getAuthHeader, parseAccessToken } from '../lib/auth'


function HeaderContainer (){
  const user = useSelector((state:RootState) => state.userInfo.user)
  const dispatch = useDispatch()

  const onGetUser = (header:headerType) => {
    dispatch(getUser.request(header))
  }

  const accessUserInfo = () =>{
    const accessToken = parseAccessToken();
    const header = getAuthHeader(accessToken);
    if(header.Authorization){
      onGetUser(header)
    }
  }

  useEffect(()=>{
    accessUserInfo()
  },[])
  return(
    <Header 
      // getUserInfo={onGetUser}
      // user={user}
    />
  )
}

export default HeaderContainer