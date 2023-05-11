import React from 'react'
import ManageBooking from '../../components/Manager/booking/ManageBooking'
import { useSelector } from 'react-redux'
import { IStore } from '../../interface/slice.interface'
import { useManagerLogout } from '../../hooks/useLogout'

function BookingManagementManager() {
    const managerToken = useSelector((state: IStore) => state.managerAuth.token)
    const logout = useManagerLogout()
    return (
    <ManageBooking logout={logout} token={managerToken}/>
  )
}

export default BookingManagementManager