import { useSelector } from "react-redux";
import { IStore } from "../../../interface/slice.interface";
import {useAdminLogout} from "../../../hooks/useLogout";
import CustomizeRoom from "../../../components/Manager/room/CustomizeRoom";

function RoomCustomize() {
  const adminToken = useSelector((state: IStore) => state.adminAuth.token);

  const logout = useAdminLogout()
  return(
    <CustomizeRoom logout={logout} token={adminToken}/>
  )
}

export default RoomCustomize;
