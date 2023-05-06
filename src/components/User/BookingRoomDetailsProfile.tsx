import { IRoomDetails } from "../../interface/booking.interface";

type props = {
  roomDetail: IRoomDetails
  roomNumber: number
}

function BookingRoomDetailsProfile({roomDetail, roomNumber}: props) {
  // const [showRoomDetails, setRoomDetails] = useState(false);
  return (
    <>

        <div className="text-sm grid pl-3 gap-2 border py-5">
          <div className="font-black mb-2">ROOM {roomNumber+1}</div>
          <div className="flex text-xs justify-between items-center">
            <div className="w-1/2 self-start">ROOM NAME</div>
            <div className="w-1/2 uppercase">: {roomDetail.roomName} </div>
          </div>
          <div className="flex text-xs justify-between items-center">
            <div className="w-1/2 self-start">ROOM NO.</div>
            <div className="w-1/2">: {roomDetail.roomNumber} </div>
          </div>
          <div className="flex text-xs justify-between items-center">
            <div className="w-1/2 self-start">PACKAGE NAME</div>
            <div className="w-1/2 uppercase">: {roomDetail.packagename} </div>
          </div>
          <div className="flex text-xs justify-between items-center">
            <div className="w-1/2">PACKAGE COST</div>
            <div className="w-1/2 text-base">
              <span className="text-xs">: INR</span> {roomDetail.packageCost}
            </div>
          </div>
        </div>
    </>
  );
}

export default BookingRoomDetailsProfile;
