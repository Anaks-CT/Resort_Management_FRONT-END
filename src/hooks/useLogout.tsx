import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeAdminToken } from '../store/slices/adminTokenSlice'
import { removeUserToken } from '../store/slices/userTokenSlice'
import { toastMessage } from '../helpers/toast'
import { removeManagerToken } from '../store/slices/managerTokenSlice'

export function useAdminLogout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(removeAdminToken())
    navigate('/admin/login')
  }
  return logout
}

export function useUserLogout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(removeUserToken())
    navigate('/login')
    toastMessage("success", "You have been logged out")
  }
  return logout
}

export function useManagerLogout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(removeManagerToken())
    navigate('/manager/login')
    toastMessage("success", "You have been logged out")
  }
  return logout
}