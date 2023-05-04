import React from "react";
import BackgroundBanner from "../../components/User/Banners/BackgroundBanner";
import CircleBanner from "../../components/User/Banners/CircleBanner";
import Contact from "../../components/User/Contact";
import Footer from "../../components/User/Footer";
import { Header2 } from "../../components/User/Header/Header";

function DIningPage() {
  const carousel = [
    {
      description1: "Local delicacies in London, Capri & Mallarca",
      miniHeading: "dining",
      description2: "Discover a world of delicious falvors across the World",
      image:
        "https://res.cloudinary.com/dhcvbjebj/image/upload/v1679407454/hero-jumeirah_london_shot_07_2582__square_2_yfu04k.avif",
    },
    {
      description1: "Inside Dubai’s Michelin-starred restaurant Al Muntaha",
      miniHeading: "dining",
      description2:
        "A sneak peek inside Burj Al Arab’s signature restaurant with a view.",
      image:
        "https://res.cloudinary.com/dhcvbjebj/image/upload/v1679407455/hero-baa-al-muntaha--interiors-and-sea-view__square_co0a5j.avif",
    },
    {
      description1: "Your guide to dining at Burj Al Arab",
      miniHeading: "dining",
      description2:
        "Discover extraordinary cuisine inside one of the Middle East’s architectural icons",
      image:
        "https://res.cloudinary.com/dhcvbjebj/image/upload/v1679407454/content-salburj-al-arabexterior-23-7-of-63__square_wvccx6.avif",
    },
  ];
  return (
    <>
      <Header2 />
      <BackgroundBanner
        heading="Pure culinary artistry from world-class chefs"
        des="Explore the vast dining possibilities of Jumeirah"
        url="https://res.cloudinary.com/dhcvbjebj/image/upload/v1679383896/wallpaperflare.com_wallpaper_2_ohobsw.jpg"
        miniHeading="RESTAURANTS"
      />
      <CircleBanner data={carousel} />
      <Contact />
      <Footer />
    </>
  );
}

export default DIningPage;
