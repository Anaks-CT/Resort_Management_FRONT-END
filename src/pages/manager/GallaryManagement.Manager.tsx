import { useEffect } from 'react';
import CommunityBannerManagement from '../../components/Manager/banner/communityBanner/communityBannerManagement';
import LargeBanneManagement from '../../components/Manager/banner/largeBanner/LargeBannerManagement';
import SmallBannerManagement from '../../components/Manager/banner/smallBanner/SmallBannerManagement';
import { getGallaryDetailsbyResortIdApi } from '../../api/gallary.api';
import { useDispatch } from 'react-redux';
import { updateGallary } from '../../store/slices/gallarySlice';


function GallaryManagement() {

  const dispatch = useDispatch()
  // const resortId
  //******************** const resortId will be changed to redux when a manager logged in
  ///////////////////////////////////// fetching gallary details by corrresponding resortId ///////////////////

  useEffect(() => {
    getGallaryDetailsbyResortIdApi("64158c7a80aa0bca76b639b5")
      .then((res) => {
        dispatch(updateGallary(res.data.data))
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  
  return (
    <div className='bg-slate-400'>
      <LargeBanneManagement />
      <SmallBannerManagement />
      <CommunityBannerManagement /> 
      {/* <SmallBanneManagement /> */}
    </div>
  )
}

export default GallaryManagement