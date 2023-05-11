import { useSelector } from "react-redux";
import RoomManagement from "../../../components/Manager/room/RoomManagement";
import { IStore } from "../../../interface/slice.interface";
import { useAdminLogout } from "../../../hooks/useLogout";

function ResortRoom() {
  const adminToken = useSelector((state: IStore) => state.adminAuth.token)
  const logout = useAdminLogout()

  return (

        <RoomManagement logout={logout} token={adminToken}/>
      
  );
}

export default ResortRoom;
