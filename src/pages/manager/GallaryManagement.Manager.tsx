// import '../../admin.css'
import CommunityBannerManagement from '../../components/Manager/banner/communityBanner/communityBannerManagement';
import LargeBanneManagement from '../../components/Manager/banner/largeBanner/LargeBannerManagement';
import SmallBannerManagement from '../../components/Manager/banner/smallBanner/SmallBannerManagement';

//doubt for the body background color
// import setBodyColor from '../../setBodyColor';

function GallaryManagement() {
//doubt for the body background color
  // setBodyColor({color: "blue"})





  
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