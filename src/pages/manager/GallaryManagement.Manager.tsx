// import '../../admin.css'
import LargeBanneManagement from '../../components/Manager/banner/largeBanner/LargeBannerManagement';
import SmallBannerManagement from '../../components/Manager/banner/smallBanner/SmallBannerManagement';
// import SmallBanneManagement from '../../components/Manager/banner/smallBannerManagement';

//doubt for the body background color
// import setBodyColor from '../../setBodyColor';

function GallaryManagement() {
//doubt for the body background color
  // setBodyColor({color: "blue"})





  
  return (
    <div className='bg-slate-400'>
      <LargeBanneManagement />
      <SmallBannerManagement />
      {/* <SmallBanneManagement /> */}
    </div>
  )
}

export default GallaryManagement