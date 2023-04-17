import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeToken } from '../store/slices/adminToken.slice'

export default function useLogout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(removeToken())
    navigate('/admin/login')
  }

  return logout
}