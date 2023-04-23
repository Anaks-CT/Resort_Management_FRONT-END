import React, { useEffect, useState } from 'react'
import { checkCredentialApi } from '../api/checkAuth'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IStore } from '../interface/slice.interface'
import { useDispatch } from 'react-redux'
import { removeToken } from '../store/slices/adminToken.slice'

function ProtectedAdminRoute(component: JSX.Element) {
  const adminToken = useSelector((state: IStore) => state.adminAuth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [auth, setAuth] = useState<String | null>(null)
  console.log(auth, 'auth');
  
useEffect(() => {
  if(adminToken.token){
    checkCredentialApi( adminToken.token)
      .then(res => {
        console.log('hello')
        setAuth(res.data.message)})
  
      .catch(err => {
        console.log('in catch')
        navigate('/admin/login')
        dispatch(removeToken())
      })
  }else{
    console.log('in else no admin token')
    navigate('/admin/login')
  }
  // eslint-disable-next-line
},[adminToken])

  if(auth){
    return component
  }else{
    <Navigate to="/admin/login" />
  }
}

export default ProtectedAdminRoute