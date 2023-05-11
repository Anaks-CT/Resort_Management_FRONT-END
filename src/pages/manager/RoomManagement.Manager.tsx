import React from 'react'
import RoomManagement from '../../components/Manager/room/RoomManagement'
import { useSelector } from 'react-redux'
import { IStore } from '../../interface/slice.interface'
import { useManagerLogout } from '../../hooks/useLogout'

function RoomManagementManager() {
    const managerToken = useSelector((state: IStore) => state.managerAuth.token)
    const logout = useManagerLogout()
  return (
    <RoomManagement logout={logout} token={managerToken} />
  )
}

export default RoomManagementManager