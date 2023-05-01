import React, { useEffect, useState } from 'react'
import { checkUserCredentialApi } from '../api/checkAuth'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IStore } from '../interface/slice.interface'
import { useDispatch } from 'react-redux'
import { removeUserToken } from '../store/slices/userTokenSlice'

function CheckAuthRoute(component: JSX.Element) {
  const userToken = useSelector((state: IStore) => state.userAuth.token)
  const dispatch = useDispatch()
  const [auth, setAuth] = useState<String | null>(null)
  
  useEffect(() => {
    if (userToken) {
      checkUserCredentialApi(userToken)
        .then((res) => setAuth(res.data.message))
        .catch((err) => {
          setAuth(null)
          dispatch(removeUserToken());
        });
    } else {
      setAuth(null);
    }
    // eslint-disable-next-line
  }, [userToken]);

  if(!auth){
    return component
  }else{
    <Navigate to="/" />
  }
}

export default CheckAuthRoute