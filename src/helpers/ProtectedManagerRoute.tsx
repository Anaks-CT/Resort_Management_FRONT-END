import React, { useEffect, useState } from 'react'
import { checkManagerCredentialApi } from '../api/checkAuth'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IStore } from '../interface/slice.interface'
import { useDispatch } from 'react-redux'
import { removeManagerToken } from '../store/slices/managerTokenSlice'

function ProtectedManagerRoute(component: JSX.Element) {
  const managerToken = useSelector((state: IStore) => state.managerAuth.token)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [auth, setAuth] = useState<String | null>(null)
  
useEffect(() => {
  if(managerToken){
    checkManagerCredentialApi( managerToken)
      .then(res => {
        setAuth(res.data.message)})
  
      .catch(err => {
        navigate('/manager/login')
        dispatch(removeManagerToken())
      })
  }else{
    navigate('/manager/login')
  }
  // eslint-disable-next-line
},[managerToken])

  if(auth){
    return component
  }else{
    <Navigate to="/manager/login" />
  }
}

export default ProtectedManagerRoute