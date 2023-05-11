import React from 'react'
import ManageUsers from '../../../components/Manager/UserManagement'
import { useSelector } from 'react-redux'
import { IStore } from '../../../interface/slice.interface'
import { useAdminLogout } from '../../../hooks/useLogout'

function UserManagement() {
  const adminToken = useSelector((state: IStore) => state.adminAuth.token)
  const logout = useAdminLogout()
  return (
    <ManageUsers token={adminToken} logout={logout} role='admin'/>
  )
}

export default UserManagement