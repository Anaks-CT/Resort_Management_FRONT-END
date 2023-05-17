import React, { useEffect, useState } from "react";
import { getCompanyDetailsApi } from "../../api/company.api";
import { getAllGallaryDetailsApi } from "../../api/gallary.api";
import { getAllResortDetailsApi } from "../../api/resort.api";
import BackgroundBanner from "../../components/User/Banners/BackgroundBanner";
import CircleBanner from "../../components/User/Banners/CircleBanner";
import CommunityBanner from "../../components/User/Banners/CommunityBanner";
import Cards from "../../components/User/Cards";
import Contact from "../../components/User/Contact";
import FAQ from "../../components/User/FAQ";
import Footer from "../../components/User/Footer";
import { Header2 } from "../../components/User/Header/Header";
import { ICompany } from "../../interface/company.interface";
import { IGallary } from "../../interface/gallary.interface";
import { IResort } from "../../interface/resort.interface";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeCurrentResort } from "../../store/slices/currentResortUserSlice";
import { toastMessage } from "../../helpers/toast";

function HomePage() {
  const [width, setWidth]  = useState<number>(window.innerWidth);
  const [companyDetails, setcompanyDetails] = useState<ICompany>();
  const [resortDetails, setresortDetails] = useState<IResort[]>();
  const [gallaryDetails, setgallaryDetails] = useState<IGallary[]>();


  const navigate = useNavigate()
  //////////////////////////////////// setting up a random number to generate random background or different resorts/////////////

  // const gallaryLength = gallaryDetails?.length || 0
  const randomNumberForGallary = Math.floor(Math.random() * 3)

  ///////////////////////////////////////////////// window.innerwidth event listener for cards in homepage/////////////////////////

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => window.removeEventListener("resize", handleWindowSizeChange);
  }, []);

  const dispatch = useDispatch()
  
  useEffect(() => {
      /////////// fetching company details  //////////
    getCompanyDetailsApi()
        .then((res) => {console.log(res); setcompanyDetails(res.data.data)})
        .catch((err) => toastMessage('error', err?.response?.data?.message))
        // /////// fetching resorts details/////////////////
    getAllResortDetailsApi()
        .then((res) => {console.log(res); setresortDetails(res.data.data)})
        .catch((err) => toastMessage('error', err?.response?.data?.message))
        ///////////////////// fetching gallary details /////////
    getAllGallaryDetailsApi()
        .then((res) => {console.log(res); setgallaryDetails(res.data.data)})
        .catch((err) => toastMessage('error', err?.response?.data?.message))
    // removing current resort from slice if any
    dispatch(removeCurrentResort())
    // eslint-disable-next-line
  }, []);

  // style for background images
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)), url(${companyDetails?.bannerDetails.image})`,
  };

  return (
    <>
      <Header2 />
      <div
        className="w-100% h-screen bg-no-repeat bg-cover md:bg-top bg-right saturate-200 flex justify-center"
        style={style}
      >
        <div className="bg-gradient-to-t from-transparent to-black absolute w-full md:h-96 h-36"></div>
        <div className="bg-gradient-to-t from-transparent to-black absolute w-full md:h-96 h-36"></div>
        <div className="self-center">
          <h1 className="text-center mb-5 z-30 font-bold tracking-widest md:text-6xl text-4xl text-white">
            {companyDetails?.companyName.toUpperCase()}
          </h1>
          <h2 className=" md:text-4xl text-lg text-white">
            {companyDetails?.bannerDetails.description}
          </h2>
        </div>
        <div className="bg-gradient-to-b from-transparent to-black absolute w-full bottom-0 h-64"></div>
      </div>
      <div className="flex justify-center items-center gap-10 p-7">
        {width > 1046 && (
          <Cards
            resortDetails={resortDetails && resortDetails[0]}
            image={resortDetails && resortDetails[0].resortDetails.image}
            heading={resortDetails && resortDetails[0].resortDetails.heading}
            description={
              resortDetails && resortDetails[0].resortDetails.description
            }
            features={resortDetails && resortDetails[0].resortDetails.features}
          />
        )}
        <div className="pt-36">
          <div className="flex flex-col gap-3 mb-10 lg:mb-28">
            <h4 className="text-white text-center tracking-wide">OFFERS</h4>
            <h4 className="text-white text-center tracking-wide">
              For Our Valued Guests
            </h4>
          </div>
          <Cards
          resortDetails={resortDetails && resortDetails[1]}
            image={resortDetails && resortDetails[1].resortDetails.image}
            heading={resortDetails && resortDetails[1].resortDetails.heading}
            description={
              resortDetails && resortDetails[1].resortDetails.description
            }
            features={resortDetails && resortDetails[1].resortDetails.features}
          />
        </div>
        {width > 1046 && (
          <Cards
          resortDetails={resortDetails && resortDetails[2]}
            image={resortDetails && resortDetails[2].resortDetails.image}
            heading={resortDetails && resortDetails[2].resortDetails.heading}
            description={
              resortDetails && resortDetails[2].resortDetails.description
            }
            features={resortDetails && resortDetails[2].resortDetails.features}
          />
        )}
      </div>
      <BackgroundBanner
        button1="BOOK NOW"
        button1Onclick={() => navigate('/booking/explore')}
        heading={gallaryDetails && gallaryDetails[randomNumberForGallary]?.largeBanner[0].description1}
        des={gallaryDetails && gallaryDetails[randomNumberForGallary]?.largeBanner[0].description2}
        url={gallaryDetails && gallaryDetails[randomNumberForGallary]?.largeBanner[0].image}
      />
      <CircleBanner data={companyDetails?.circleBanners} />
      <CommunityBanner gallaryDetails={gallaryDetails}/>
      <BackgroundBanner
        button1="JOIN NOW"
        button2="LOGIN"
        button1Onclick={() =>navigate('/signup')}
        button2Onclick={() =>navigate('/login')}
        des={`Make moments with Jumeirah even 
        more special with member-only benefits.`}
        heading="Join the Trinity One Family Today"
        url="https://res.cloudinary.com/dhcvbjebj/image/upload/v1679049548/tyler-nix-V3dHmb1MOXM-unsplash_mvjvv6.jpg"
      />
      <div className="mt-10 md:p-36">
        <Contact />
      </div>
      <div className="w-full">
        <FAQ
          faqs={companyDetails?.faqs && companyDetails?.faqs}
        />
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
