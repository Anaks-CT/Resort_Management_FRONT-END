import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGallaryDetailsbyResortIdApi } from "../../api/gallary.api";
import { updateGallary } from "../../store/slices/gallarySlice";
import LargeBannerManagement from "../../components/Manager/banner/largeBanner/LargeBannerManagement";
import SmallBannerManagement from "../../components/Manager/banner/smallBanner/SmallBannerManagement";
import CommunityBannerManagement from "../../components/Manager/banner/communityBanner/communityBannerManagement";
import { useSelector } from "react-redux";
import { IStore } from "../../interface/slice.interface";
import { Header } from "../../components/Manager/Header";
import AdminResortSideBar from "../../components/Manager/sidebar/AdminResortSideBar";

function GallaryManagement() {
  const dispatch = useDispatch();
  const resortId = useSelector((state: IStore) => state.resort.resortId);

  ///////////////////////////////////// fetching gallary details by corrresponding resortId ///////////////////

  useEffect(() => {
    getGallaryDetailsbyResortIdApi(resortId)
      .then((res) => {
        dispatch(updateGallary(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
      // eslint-disable-next-line
  }, []);

  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0),rgba(0, 0, 0, 0.7)), url("https://res.cloudinary.com/dhcvbjebj/image/upload/v1683015725/wallpaperflare.com_wallpaper_9_s9z82o.jpg")`,
  };
  return (
      <>
      <Header />
      <div
        className="bg-no-repeat bg-fixed bg-center h-full w-screen pt-[60px] flex justify-center" // doubt in mobile view
        style={style}
      >
       <AdminResortSideBar />
      <div>
      <LargeBannerManagement />
      <SmallBannerManagement />
      <CommunityBannerManagement />
      </div>

      </div>
    </>
  );
}

export default GallaryManagement;
