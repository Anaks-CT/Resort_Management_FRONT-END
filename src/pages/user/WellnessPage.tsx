import React from "react";
import BackgroundBanner from "../../components/User/Banners/BackgroundBanner";
import CircleBanner from "../../components/User/Banners/CircleBanner";
import Contact from "../../components/User/Contact";
import Footer from "../../components/User/Footer";
import { Header2 } from "../../components/User/Header/Header";

function WellnessPage() {
    const circleBannerCarouselData1 = [
        {
          description1: "Never stop your daily routine",
            miniHeading: "gym",
            description2: "The latest fitness machines and professional trainers to help you tone muscles and improve flexibility",
            image: "https://res.cloudinary.com/dhcvbjebj/image/upload/v1679373812/jet-main-banner_tvz0is.jpg"
        },
        {
          description1: "Capri Fitness",
            miniHeading: "CAPRI gym",
            description2: "Combining the best of fitness, leisure, dining, spa, and wellness, The J-Club is a membership lifestyle and wellness destination, designed with you in mind.",
            image: "https://res.cloudinary.com/dhcvbjebj/image/upload/v1679373811/capripalace004445103_chdf7a.jpg"
        },
        {
          description1: "Talise Fitness at Trinity centre",
            miniHeading: "gym",
            description2: "A fully equipped gymnasium with state-of-the-art equipment offering an indoor and outdoor functional training zone",
            image: "https://res.cloudinary.com/dhcvbjebj/image/upload/v1679373810/brooklyn-gym-generic-file-covidjpg_hjrcsa.jpg"
        },
    ]
    const circleBannerCarouselData2 = [
        {
          description1: "Capri Medical Spa",
            miniHeading: "wellness",
            description2: "Holistic spa experience which combines the best of western and eastern traditions",
            image: "https://res.cloudinary.com/dhcvbjebj/image/upload/v1679382614/madinatjumeirahtalisespalifestyle50__square_afevfc.avif"
        },
        {
          description1: "Jumeirah Zabeel Saray",
            miniHeading: "wellness",
            description2: "Explore an indulgent selection of spa experiences inspired by the Ottoman heritage.",
            image: "https://res.cloudinary.com/dhcvbjebj/image/upload/v1679382614/burj-al-arab-talise-spa-8_6-4_landscape__square_riledi.avif"
        },
        {
          description1: "Talise Fitness at Jumeirah Beach Hotel",
            miniHeading: "wellness",
            description2: "A sensory journey from land to sea, at Jumeirah Beach Hotel.",
            image: "https://res.cloudinary.com/dhcvbjebj/image/upload/v1679382615/thepeakfitnessclubandspaswimmingpool_web__square_1_qivazp.avif"
        },
    ]
  return (
    <>
      <Header2 />
      <BackgroundBanner
        heading="Fitness Centre at Trinity wild"
        des="State-of-the-art Fitness Facilities"
        url="https://res.cloudinary.com/dhcvbjebj/image/upload/v1679372976/wallpaperflare.com_wallpaper_5_apn6dy.jpg"
        miniHeading="fitness"
      />
      <CircleBanner invert data={circleBannerCarouselData1}/>
      <BackgroundBanner
        heading="Nourishment for mind, body and soul"
        des="Return to balance, escape from the everyday and reinvigorate your mental and physical wellbeing in Jumeirah’s tranquil and welcoming surroundings"
        url="https://res.cloudinary.com/dhcvbjebj/image/upload/v1679372989/wallpaperflare.com_wallpaper_6_nsxj2q.jpg"
        miniHeading="spa"
      />
      <CircleBanner data={circleBannerCarouselData2}/>
      <Contact />
      <Footer />
    </>
  );
}

export default WellnessPage;
