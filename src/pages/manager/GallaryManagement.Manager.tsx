import { useEffect } from "react";
import CommunityBannerManagement from "../../components/Manager/banner/communityBanner/communityBannerManagement";
import LargeBanneManagement from "../../components/Manager/banner/largeBanner/LargeBannerManagement";
import SmallBannerManagement from "../../components/Manager/banner/smallBanner/SmallBannerManagement";
import { getGallaryByManagerIdApi, getGallaryDetailsbyResortIdApi } from "../../api/gallary.api";
import { useDispatch } from "react-redux";
import { updateGallary } from "../../store/slices/gallarySlice";
import { toastMessage } from "../../helpers/toast";
import { IStore } from "../../interface/slice.interface";
import { useSelector } from "react-redux";

function GallaryManagement() {
  const dispatch = useDispatch();
  // const resortId
  //******************** const resortId will be changed to redux when a manager logged in
  ///////////////////////////////////// fetching gallary details by corrresponding resortId ///////////////////
  const managerToken = useSelector((state: IStore) => state.managerAuth.token) 
  useEffect(() => {
    getGallaryByManagerIdApi(managerToken)
      .then((res) => dispatch(updateGallary(res.data.data)))
      .catch((err) => toastMessage("error", err?.response?.data?.message));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <LargeBanneManagement />
      <SmallBannerManagement />
      <CommunityBannerManagement />
    </>
  );
}

export default GallaryManagement;
