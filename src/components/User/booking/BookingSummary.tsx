import React, { useState } from "react";
import Button from "../../UI/Button";
import { IBookingForm1 } from "../../../interface/booking.interface";
import { bookingForm1APi, verifyBookingAPi } from "../../../api/booking.api";
import { useSelector } from "react-redux";
import { IStore } from "../../../interface/slice.interface";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserLogout } from "../../../hooks/useLogout";
import { toastMessage } from "../../../helpers/toast";
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}
declare global {
  interface Window {
    Razorpay: any;
  }
}
type props = {
  form1Values: IBookingForm1;
  bookingOverViewRoomDetails: any[];
};

function BookingSummary({ form1Values, bookingOverViewRoomDetails }: props) {
  const [applyPoints, setApplyPoints] = useState(false);
  const location = useLocation()
  const points = location?.state?.userPoints
  const [error, setError] = useState("");
  const userToken = useSelector((state: IStore) => state.userAuth.token);
  const totalGuests = form1Values?.roomDetail.reduce(
    (acc, cur) => (acc += +cur),
    0
  );

  // razorpay payment
  async function loadScript(src: string) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function removeScript(src: string): Promise<boolean> {
    return new Promise((resolve) => {
      const scripts = document.getElementsByTagName("script");
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].getAttribute("src") === src) {
          scripts[i].parentNode?.removeChild(scripts[i]);
          resolve(true);
          return;
        }
      }
      resolve(false);
    });
  }

  const logout = useUserLogout();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmitBooking = async () => {
    try {
      setLoading(true);
      await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      try {
        const { data } = await bookingForm1APi(
          { ...form1Values, applyPoints },
          bookingOverViewRoomDetails,
          userToken
        );
        const { data: razorPayOrderDetails, bookingId } = data;
         // set the timeout for 10 minutes (600,000 milliseconds)
         const timeOut = async () => {
          const razorpayContainer = document.querySelector(
            ".razorpay-container"
          );
            razorpayContainer?.remove(); // removes the div element from the DOM
          setLoading(false);
          setError(
            "Your payment session has timed out due to inactivity. Please try again."
          );
          await removeScript("https://checkout.razorpay.com/v1/checkout.js");
          paymentObject.close(); // close the Razorpay payment modal
          paymentObject.destroy();
        };
        const timeOutId = setTimeout(timeOut,20000)
        const options = {
          key: "rzp_test_LW8S6IZVTSmO7B",
          currency: razorPayOrderDetails.currency,
          amount: razorPayOrderDetails.amount.toString(),
          order_id: razorPayOrderDetails.id,
          name: "TRINITY",

          
          handler: async function (response: RazorpayResponse) {
            const paymentData = {
              orderCreationId: razorPayOrderDetails.id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              bookingId: bookingId,
            };

            verifyBookingAPi(paymentData)
              .then((res) =>
                navigate("/profile/bookings", {
                  state: { prevPath: "booking" },
                })
              )
              .catch((err) => setError(err))
              .finally(() => setLoading(false));
          },
          prefill: {
            name: "Anaks CT",
            email: "anyEmail",
            phone_number: "user?.mobile",
          },
          modal: {
            "ondismiss": function(){
                 setLoading(false)
                 clearTimeout(timeOutId)
             }
        }
        };

        const paymentObject = new window.Razorpay(options);

        
       

        paymentObject.open();
      } catch (error: any) {
        setLoading(false)
        if (error?.response?.status === 401) {
          logout();
          toastMessage("error", error?.response?.data.message);
        }
        setError(error.response.data.message);
      }
    } catch (error: any) {
      setLoading(false)
      if (error?.response?.status === 401) {
        logout();
        toastMessage("error", error?.response?.data.message);
      }
      setError(error);
    }
  };

  const totalRoomCost = bookingOverViewRoomDetails?.reduce(
    (acc, cur) => (acc += cur.packageCost),
    0
  );
  const taxCost = Math.floor((totalRoomCost * 22) / 100);
  const payableAmount = totalRoomCost + taxCost;

  return (
    <div className=" px-7 self-center  w-full  my-5">
      <div className="bg-white p-5 lg:p-10 font-sans text-sm rounded shadow divide-y lg:justify-between lg:divide-x lg:divide-y-0 flex flex-col gap-3 lg:flex-row">
        <div className="lg:w-2/5">
          <h2 className="text-center text-2xl mb-10 font-sans tracking-wide font-semibold uppercase ">
            Booking Summary
          </h2>
          <div className="flex justify-between">
            <span>Resort Name :</span>
            <span className="w-1/2">{form1Values?.destination.name}</span>
          </div>
          <div className="flex justify-between">
            <span>No. of Rooms :</span>
            <span className="w-1/2">
              {form1Values?.roomDetail.length} Room(s)
            </span>
          </div>
          <div className="flex justify-between">
            <span>No. of Guests :</span>
            <span className="w-1/2">{totalGuests} Guest(s)</span>
          </div>
          <div className="flex justify-between">
            <span>Dates :</span>
            <span className="w-1/2">
              {form1Values?.date.startDate.toLocaleDateString()} -{" "}
              {form1Values?.date.endDate.toLocaleDateString()}
            </span>
          </div>
          {bookingOverViewRoomDetails?.map((item, i) => (
            <div key={item} className="flex flex-col gap-2">
              <div className="my-2 font-black px-2">Room {i + 1}</div>
              <div className="flex justify-between">
                <span>Room Name :</span>
                <span className="w-1/2">{item.roomName}</span>
              </div>
              <div className="flex justify-between">
                <span>Package Name :</span>
                <span className="w-1/2">{item.packageName}</span>
              </div>
              <div className="flex justify-between">
                <span>Package Cost :</span>
                <span className="w-1/2">
                  ₹ {item.packageCost.toLocaleString("en-IN")}{" "}
                  <span className="text-[11px]">(exc. taxes and fees)</span>
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="divide-y flex flex-col gap-3 lg:w-1/2 justify-center">
          <div>
            <div className="text-center my-4 font-sans tracking-wide text-premium">
              TOTAL ROOM COST EXCLUDING TAXES AND FEES.
            </div>
            <div className="text-2xl font-bold text-center">
              <span className="text-lg font-normal">INR</span>{" "}
              {totalRoomCost?.toLocaleString("en-IN")}
            </div>
          </div>
          <div>
            <div className="text-center my-4 font-sans tracking-wide text-premium">
              APPLICABLE TAXES & FEES.
            </div>
            <div className="text-2xl font-bold text-center mb-2">
              <span className="text-lg font-normal">INR</span>{" "}
              {taxCost.toLocaleString("en-IN")}
            </div>
            <div className="text-[10px] px-8">
              *Room rate is subject to 10% Service Charge, 7% Municipality Fee,
              and 5% VAT. A Tourism Dirham Fee of AED20 per bedroom, per night,
              is not included in the total room cost and will be charged at the
              hotel at time of check-out.
            </div>
          </div>
          <div>
            <div className="text-center my-4 font-sans tracking-wide text-premium">
              TOTAL PAYABLE AMOUNT.
            </div>
            <div className="text-4xl font-bold mb-2 flex justify-center items-center gap-4">
              <span className="text-lg font-normal">INR</span>{" "}
              <span className={`${applyPoints && "line-through text-2xl"}`}>{payableAmount.toLocaleString("en-IN")}</span>
              {applyPoints && <span>{payableAmount-points<1000 ? "1,000" : (payableAmount-points).toLocaleString("en-IN")}</span>}
            </div>
              {(payableAmount-points && applyPoints) && <div className="text-center"><span >Booking confirmation fee</span></div>}
            <div className="text-center mt-3">
              <Button class="py-1 px-2 text-xs" color="grey" outline onClick={() => setApplyPoints(!applyPoints)}>
                {applyPoints ? "REMOVE POINTS" : "APPLY POINTS"}
              </Button>
            </div>
          </div>
          <div className="mx-auto  mt-3">
            <Button
              onClick={handleSubmitBooking}
              class="w-full"
              outline
              color="premium"
              disable={loading}
            >
              BOOK NOW
            </Button>
            <div className="text-[9px]">
              *I will present a valid ID during CHECK-IN. I also agree to the
              terms & conditions.
            </div>
            <div className="text-center text-red-500">{error}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingSummary;
