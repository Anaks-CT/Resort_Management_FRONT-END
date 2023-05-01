import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header2 } from "../../components/User/Header/Header";
import { IResort } from "../../interface/resort.interface";
import BackgroundBanner from "../../components/User/Banners/BackgroundBanner";
import { IGallary } from "../../interface/gallary.interface";
import CircleBanner from "../../components/User/Banners/CircleBanner";
import CommunityBanner from "../../components/User/Banners/CommunityBanner";
import Contact from "../../components/User/Contact";
import FAQ from "../../components/User/FAQ";
import Footer from "../../components/User/Footer";
import { getGallaryDetailsbyResortIdApi } from "../../api/gallary.api";
import { toastMessage } from "../../helpers/toast";
import { getCompanyDetailsApi } from "../../api/company.api";
import RoomCards from "../../components/User/room/RoomCards";
import { getRoomsByResortIdApi } from "../../api/room.api";
import { IRoom } from "../../interface/room.interface";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

function ResortHomePage() {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const [gallaryDetail, setGallaryDetail] = useState<IGallary>();
  const randomNumberForGallary = Math.floor(
    Math.random() * (gallaryDetail?.largeBanner.length || 0)
  );
  const [roomDetails, setRoomDetails] = useState<IRoom[]>();

  const [number, setNumber] = useState(0);
  useEffect(() => {
    width > 768 && setNumber(0)
  },[width])
  const incrementNumber = () => {
    if (roomDetails && roomDetails.length) {
      setNumber(number === roomDetails.length - 1 ? 0 : number + 1);
    }
  };
  
  const decrementNumber = () => {
    if (roomDetails && roomDetails.length) {
      setNumber(number === 0 ? roomDetails.length - 1 : number - 1);
    }
  };
  console.log(gallaryDetail);
  const [faqs, setFaqs] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const resortDetails: IResort = location?.state?.resortDetails;
  useEffect(() => {
    if (!location?.state?.resortDetails) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getGallaryDetailsbyResortIdApi(resortDetails?._id)
      .then((res) => setGallaryDetail(res.data.data))
      .catch((err) => {
        toastMessage("error", err?.response?.data?.message);
      });

    getCompanyDetailsApi()
      .then((res) => setFaqs(res.data.data.faqs))
      .catch((err) => {
        toastMessage("error", err?.response?.data?.message);
      });

    getRoomsByResortIdApi(resortDetails?._id)
      .then((res) => setRoomDetails(res.data.data))
      .catch((err) => {
        toastMessage("error", err?.response?.data?.message);
      });
      // eslint-disable-next-line
  }, []);

  ///////////////////////////////////////////////// window.innerwidth event listener for cards in homepage/////////////////////////

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  // style for background image
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)), url(${resortDetails?.resortDetails?.image})`,
  };
  console.log(roomDetails);
  return (
    <>
      <Header2 />
      <div
        className="w-100% h-screen bg-no-repeat bg-cover  bg-center saturate-200 flex justify-center"
        style={style}
      >
        <div className="bg-gradient-to-t from-transparent to-black absolute w-full md:h-96 h-36"></div>
        <div className="bg-gradient-to-t from-transparent to-black absolute w-full md:h-96 h-36"></div>
        <div className="self-center">
          <h1 className="text-center mb-5 z-30 font-bold tracking-widest md:text-6xl text-4xl text-white">
            {resortDetails?.resortDetails.name.toUpperCase()}
          </h1>
          <h2 className=" md:text-4xl text-lg text-white">
            {resortDetails?.resortDetails.description}
          </h2>
        </div>
        <div className="bg-gradient-to-b from-transparent to-black absolute w-full bottom-0 h-64"></div>
      </div>
      <div className="flex justify-center items-center gap-24 py-10 md:py-32 mt-32 relative">
        {roomDetails && roomDetails?.length > 0 && (
          <div className="relative">
            {width < 768 && (
              <>
                <BsChevronLeft className="text-white text-2xl absolute -left-10 top-1/2 cursor-pointer" onClick={decrementNumber}/>
                <BsChevronRight className="text-white text-2xl absolute -right-10 top-1/2 cursor-pointer" onClick={incrementNumber}/>
              </>
            )}
            <RoomCards
            description={
              !!(roomDetails && roomDetails?.length > 0)
                ? roomDetails[number].description
                : undefined
            }
            facilities={
              !!(roomDetails && roomDetails?.length > 0)
                ? roomDetails[number].facilities
                : undefined
            }
            image={
              !!(roomDetails && roomDetails?.length > 0)
                ? roomDetails[number].images[0]
                : undefined
            }
            roomName={
              !!(roomDetails && roomDetails?.length > 0)
                ? roomDetails[number].name
                : undefined
            }
          />
          </div>
        )}
        {width > 768 && roomDetails && roomDetails?.length > 1 && (
          <RoomCards
            description={
              !!(roomDetails && roomDetails?.length > 1)
                ? roomDetails[1].description
                : undefined
            }
            facilities={
              !!(roomDetails && roomDetails?.length > 1)
                ? roomDetails[1].facilities
                : undefined
            }
            image={
              !!(roomDetails && roomDetails?.length > 1)
                ? roomDetails[1].images[0]
                : undefined
            }
            roomName={
              !!(roomDetails && roomDetails?.length > 1)
                ? roomDetails[1].name
                : undefined
            }
          />
        )}
        {width > 1111 && roomDetails && roomDetails?.length > 2 && (
          <RoomCards
            description={
              !!(roomDetails && roomDetails?.length > 2)
                ? roomDetails[2].description
                : undefined
            }
            facilities={
              !!(roomDetails && roomDetails?.length > 2)
                ? roomDetails[2].facilities
                : undefined
            }
            image={
              !!(roomDetails && roomDetails?.length > 2)
                ? roomDetails[2].images[0]
                : undefined
            }
            roomName={
              !!(roomDetails && roomDetails?.length > 2)
                ? roomDetails[2].name
                : undefined
            }
          />
        )}
      </div>
      <BackgroundBanner
        button1="BOOK NOW"
        button1Onclick={() => navigate('/booking/explore')}
        heading={
          gallaryDetail &&
          gallaryDetail.largeBanner[randomNumberForGallary].description1
        }
        des={
          gallaryDetail &&
          gallaryDetail.largeBanner[randomNumberForGallary].description2
        }
        url={
          gallaryDetail &&
          gallaryDetail.largeBanner[randomNumberForGallary].image
        }
      />
      <CircleBanner data={gallaryDetail?.smallBanner} />
      <CommunityBanner communityPics={gallaryDetail?.communityPics} />
      <BackgroundBanner
        button1="JOIN NOW"
        button2="LOGIN"
        button1Onclick={() => navigate("/signup")}
        button2Onclick={() => navigate("/login")}
        des={`Make moments with Jumeirah even 
        more special with member-only benefits.`}
        heading="Join the Trinity One Family Today"
        url="https://res.cloudinary.com/dhcvbjebj/image/upload/v1679049548/tyler-nix-V3dHmb1MOXM-unsplash_mvjvv6.jpg"
      />
      <div className="mt-10 md:p-36">
        <Contact />
      </div>
      <div className="w-full">
        <FAQ faqs={faqs && faqs} />
      </div>
      <Footer />
    </>
  );
}

export default ResortHomePage;
