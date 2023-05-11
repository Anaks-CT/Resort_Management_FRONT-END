import React from 'react'
import { useSelector } from 'react-redux'
import { IStore } from '../../interface/slice.interface'
import { useManagerLogout } from '../../hooks/useLogout'
import CustomizeRoom from '../../components/Manager/room/CustomizeRoom'

function CustomizeRoomManager() {
    const managerToken = useSelector((state: IStore) => state.managerAuth.token)
    const logout = useManagerLogout()
  return (
    <CustomizeRoom logout={logout} token={managerToken}/>

  )
}

export default CustomizeRoomManager