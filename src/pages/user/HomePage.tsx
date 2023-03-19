import React, { useEffect, useState } from "react";
import BackgroundBanner from "../../components/User/Banners/BackgroundBanner";
import CircleBanner from "../../components/User/Banners/CircleBanner";
import CommunityBanner from "../../components/User/Banners/CommunityBanner";
import Cards from "../../components/User/Cards";
import Contact from "../../components/User/Contact";
import FAQ from "../../components/User/FAQ";
import Footer from "../../components/User/Footer";
import { Header2 } from "../../components/User/Header/Header";
import { axiosCompany, axiosResort } from "../../config/api";
import { ICompany } from "../../interface/company.interface";
import { IResort } from "../../interface/resort.interface";

function HomePage() {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [companyDetails, setcompanyDetails] = useState<ICompany>();
  const [resortDetails, setresortDetails] = useState<IResort>();

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

  ///////////////////////////////////////////////// fetching company details  ////////////////////////////////

  useEffect(() => {
    axiosCompany
      .get("/companyDetails")
      .then((res) => {
        setcompanyDetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /////////////////////////////////////////////////// fetching resorts details/////////////////////////////////

  useEffect(() => {
    axiosResort.get("/allresortDetails").then((res) => {
      console.log(res);
      
    })
    .catch((err)=>{
      console.log(err);
      
    })
    
  });

  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)), url(${companyDetails?.bannerDetails.image})`,
  };

  const features = [
    "Upto 25% of your stay 1",
    "Upto 25% of your stay 2",
    "Upto 25% of your stay 3",
  ];
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
            image="https://res.cloudinary.com/dhcvbjebj/image/upload/v1679034527/elizeu-dias-RN6ts8IZ4_0-unsplash_o6jwte.jpg"
            heading="Exceptional Island Escapes"
            description="Treat yourself to the ultimate get away"
            features={features}
          />
        )}
        <div className="pt-36">
          <div className="flex flex-col gap-3 mb-28">
            <h4 className="text-white text-center tracking-wide">OFFERS</h4>
            <h4 className="text-white text-center tracking-wide">
              For Our Valued Guests
            </h4>
          </div>
          <Cards
            image="https://res.cloudinary.com/dhcvbjebj/image/upload/v1679034527/elizeu-dias-RN6ts8IZ4_0-unsplash_o6jwte.jpg"
            heading="Exceptional Island Escapes"
            description="Treat yourself to the ultimate get away"
            features={features}
          />
        </div>
        {width > 1046 && (
          <Cards
            image="https://res.cloudinary.com/dhcvbjebj/image/upload/v1679034527/elizeu-dias-RN6ts8IZ4_0-unsplash_o6jwte.jpg"
            heading="Exceptional Island Escapes"
            description="Treat yourself to the ultimate get away"
            features={features}
          />
        )}
      </div>
      <BackgroundBanner
        button1="BOOK NOW"
        des={`Unwind in sublime surroundings in this
            all-villa resort, where luxury living,
            signature dining and effortless wellbeing
            await you.`}
        heading="An idyllic Island Escape at Jumeirah Maldives"
        url="https://res.cloudinary.com/dhcvbjebj/image/upload/v1678890220/usp-5--jumeirah-maldives--talise-spa--aerial-2-crop__square_l0qu8v.jpg"
      />
      <CircleBanner />
      <CommunityBanner />
      <BackgroundBanner
        button1="JOIN NOW"
        button2="LOGIN"
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
          faqs={[
            { id: "1", Q: "nee aaara?", A: "Joe mama" },
            { id: "2", Q: "nee edha?", A: "Joe dada" },
          ]}
        />
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
