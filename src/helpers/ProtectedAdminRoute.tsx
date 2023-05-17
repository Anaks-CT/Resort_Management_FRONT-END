import React, { useEffect, useState } from 'react'
import { checkAdminCredentialApi } from '../api/checkAuth'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IStore } from '../interface/slice.interface'
import { useDispatch } from 'react-redux'
import { removeAdminToken } from '../store/slices/adminTokenSlice'

function ProtectedAdminRoute(component: JSX.Element) {
  const adminToken = useSelector((state: IStore) => state.adminAuth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [auth, setAuth] = useState<String | null>(null)
  const [loading, setLoading] = useState(false)

useEffect(() => {
  if(adminToken.token){
    setLoading(true)
    checkAdminCredentialApi( adminToken.token)
      .then(res => {
        setAuth(res.data.message)})
  
      .catch(err => {
        navigate('/admin/login')
        dispatch(removeAdminToken())
      }).finally(() => setLoading(false))
  }else{
    setLoading(false)
    navigate('/admin/login')
  }
  // eslint-disable-next-line
},[adminToken])

if (loading)
return (
  <div className="flex justify-center h-screen w-screen items-center">
    <img
      width={50}
      src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1684325917/Infinity-1s-200px_2_hlvlh0.gif"
      alt=""
    />
  </div>
);

  if(auth){
    return component
  }else{
    <Navigate to="/admin/login" />
  }
}

export default ProtectedAdminRoute