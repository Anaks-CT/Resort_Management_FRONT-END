import { useSelector } from "react-redux"
import ManageUsers from "../../components/Manager/UserManagement"
import { IStore } from "../../interface/slice.interface"
import { useManagerLogout } from "../../hooks/useLogout"

function UserManagementManager() {
    const managerToken = useSelector((state: IStore) => state.managerAuth.token)
    const logout = useManagerLogout()
    
  return (
    <ManageUsers token={managerToken} logout={logout} role="manager"/>
  )
}

export default UserManagementManager