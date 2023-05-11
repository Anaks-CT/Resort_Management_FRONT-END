import { useSelector } from "react-redux";
import ManageBooking from "../../../components/Manager/booking/ManageBooking";
import { IStore } from "../../../interface/slice.interface";
import { useAdminLogout } from "../../../hooks/useLogout";

function BookingManagement() {
    const adminToken = useSelector((state: IStore) => state.adminAuth.token)
    const logout = useAdminLogout()
    return (
        <ManageBooking logout={logout} token={adminToken}/>
    )
}

export default BookingManagement;
