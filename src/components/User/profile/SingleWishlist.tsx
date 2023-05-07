import React, { useState } from "react";
import Button from "../../UI/Button";
import { IWishlist } from "../../../interface/wishlist.interface";
import { getDateInRange } from "../../../helpers/getDatesInRange";
import { BsTrash } from "react-icons/bs";
import { deleteWishlistApi } from "../../../api/user.api";
import { useSelector } from "react-redux";
import { IStore } from "../../../interface/slice.interface";
import { toastMessage } from "../../../helpers/toast";
import { getAvailableRoomsApi } from "../../../api/room.api";
import { useNavigate } from "react-router-dom";
import { useUserLogout } from "../../../hooks/useLogout";

type props = {
  singleWishlist: IWishlist;
  setWishlistDetails: React.Dispatch<
    React.SetStateAction<IWishlist[] | undefined>
  >;
};

function SingleWishlist({ singleWishlist, setWishlistDetails }: props) {
  const numberOfDates = getDateInRange(
    singleWishlist.dates.startDate,
    singleWishlist.dates.endDate
  ).length;
  const [loading, setLoading] = useState(false);
  const [checkAvailLoading, setAvailLoading] = useState(false);
  console.log(singleWishlist);
  const userToken = useSelector((state: IStore) => state.userAuth.token);
  const deleteWishlist = () => {
    setLoading(true);
    deleteWishlistApi(userToken, singleWishlist._id!)
      .then((res) => {
        setWishlistDetails(res.data.data);
        toastMessage("success", res.data.message);
      })
      .catch((err) => toastMessage("error", err?.response?.data?.message))
      .finally(() => setLoading(false));
  };
  const navigate = useNavigate();
  const logout = useUserLogout();
  const [error, setError] = useState("");
  const startDate = new Date(singleWishlist.dates.startDate)
  const endDate = new Date(singleWishlist.dates.endDate)
  // set the desired time value
startDate.setUTCHours(18);
startDate.setUTCMinutes(30);
startDate.setUTCSeconds(0);
startDate.setUTCMilliseconds(0);
endDate.setUTCHours(18);
endDate.setUTCMinutes(30);
endDate.setUTCSeconds(0);
endDate.setUTCMilliseconds(0);
  const roomAvailabilityDetails = {
    destination: {
      name: singleWishlist.resortName!,
      id: singleWishlist.resortId,
    },
    roomDetail: singleWishlist.roomDetail,
    date: {
      startDate: startDate,
      endDate: endDate,
      key: "selection"
    }
  };
  const checkRoomAvailability = () => {
    setAvailLoading(true);
    getAvailableRoomsApi(roomAvailabilityDetails, userToken)
      .then((res) =>
        navigate("/booking/stay", {
          state: {
            data: res.data.data,
            bookingForm1: roomAvailabilityDetails,
            wishlist: true
          },
        })
      )
      .catch((err) => {
        if (err.response.status === 401) {
          logout();
          toastMessage("error", err.response.data.message);
        }
        setError(err.response.data.message);
      })
      .finally(() => setAvailLoading(false));
  };
  return (
    <div className="p-3 py-5 text-black bg-white grid gap-2 rounded relative">
      {loading ? (
        <div className="flex justify-center absolute top-1 right-3">
          <img
            width={30}
            src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1680669482/Spinner-1s-200px_4_ontbds.gif"
            alt=""
          />
        </div>
      ) : (
        <BsTrash
          className="absolute top-4 md:text-lg right-3 cursor-pointer"
          onClick={deleteWishlist}
        />
      )}

      <div className="grid gap-2 md:gap-0 md:divide-x md:flex md:justify-between  text-xs pl-3 lg:mx-0">
        <div className="grid gap-2 md:w-3/5 ">
          <div className="flex  justify-between items-center">
            <div className="w-1/2">RESORT NAME</div>
            <div className="w-1/2 uppercase">: {singleWishlist.resortName}</div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2">NO. OF ROOM(S)</div>
            <div className="w-1/2">: {singleWishlist.roomDetail.length}</div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2">NO. OF GUEST(S)</div>
            <div className="w-1/2">
              :{" "}
              {singleWishlist.roomDetail.reduce((acc, cur) => (acc += +cur), 0)}
            </div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2">NO. OF DAY(S)</div>
            <div className="w-1/2">: {numberOfDates}</div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2">DATE</div>
            <div className="w-1/2 md:whitespace-nowrap">
              : {new Date(singleWishlist.dates.startDate).toLocaleDateString()}{" "}
              -{new Date(singleWishlist.dates.endDate).toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="mx-auto my-auto text-center">
          {checkAvailLoading && (
            <div className="flex justify-center ">
              <img
                width={40}
                src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1680669482/Spinner-1s-200px_4_ontbds.gif"
                alt=""
              />
            </div>
          )}
          <Button
            class="py-2 px-3 font-black"
            outline
            color="grey"
            disable={!!checkAvailLoading}
            onClick={checkRoomAvailability}
          >
            CHECK AVAILABILITY
          </Button>
          <div className="text-red-500 md:text-sm text-xs text-center">
            {error}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleWishlist;
