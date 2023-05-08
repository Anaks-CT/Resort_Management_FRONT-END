import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGallaryDetailsbyResortIdApi } from "../../../api/gallary.api";
import { updateGallary } from "../../../store/slices/gallarySlice";
import LargeBannerManagement from "../../../components/Manager/banner/largeBanner/LargeBannerManagement";
import SmallBannerManagement from "../../../components/Manager/banner/smallBanner/SmallBannerManagement";
import CommunityBannerManagement from "../../../components/Manager/banner/communityBanner/communityBannerManagement";
import { useSelector } from "react-redux";
import { IStore } from "../../../interface/slice.interface";
import { toastMessage } from "../../../helpers/toast";

function GallaryManagement() {
  const dispatch = useDispatch();
  const resortId = useSelector((state: IStore) => state.resort.resortId);

  ///////////////////////////////////// fetching gallary details by corrresponding resortId ///////////////////

  useEffect(() => {
    getGallaryDetailsbyResortIdApi(resortId)
      .then((res) => dispatch(updateGallary(res.data.data)))
      .catch((err) => toastMessage("error", err?.response?.data?.message));
    // eslint-disable-next-line
  }, []);

  return (
      <div>
        <LargeBannerManagement />
        <SmallBannerManagement />
        <CommunityBannerManagement />
      </div>
  );
}

export default GallaryManagement;
