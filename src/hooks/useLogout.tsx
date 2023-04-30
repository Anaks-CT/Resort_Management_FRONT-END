import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeAdminToken } from '../store/slices/adminTokenSlice'
import { removeUserToken } from '../store/slices/userTokenSlice'

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
  }

  return logout
}