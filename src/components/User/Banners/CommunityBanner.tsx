import { IGallary } from '../../../interface/gallary.interface'

type props = {
  gallaryDetails?: IGallary[] | undefined
  communityPics?: any
}

function CommunityBanner({gallaryDetails, communityPics}: props) { 

  return (
    <div className='container lg:p-36 px-10 mx-auto'>
      <div className='w-full flex justify-center mb-20'><p className='text-white'>SOCIAL CAPUTRES FROM <br/>OUR GUESTS ADVENTURES</p></div>
        {(gallaryDetails || communityPics) && (
          <div className='grid lg:grid-rows-6 lg:grid-flow-col gap-x-20 gap-y-10'>
          <div className='py-32 bg-red-100 row-span-2 bg-cover bg-top' style={{backgroundImage:`url(${gallaryDetails ? gallaryDetails[0].communityPics[0] : communityPics[0]})`}}></div>
          <div className='py-32 bg-black lg:block hidden text-white'></div>
          <div className='py-32 bg-red-100 row-span-2 bg-cover bg-top' style={{backgroundImage:`url(${gallaryDetails ? gallaryDetails[1].communityPics[1] : communityPics[1]})`}}></div>
          <div className='py-32 bg-black lg:block hidden text-white'></div>
          <div className='py-32 bg-black lg:block hidden text-white'></div>
          <div className='py-32 bg-red-100 row-span-2 bg-cover bg-top' style={{backgroundImage:`url(${gallaryDetails ? gallaryDetails[2].communityPics[2] : communityPics[2]})`}}></div>
          <div className='py-32 bg-black lg:block hidden text-white'></div>
          <div className='py-32 bg-red-100 row-span-2 bg-cover bg-top' style={{backgroundImage:`url(${gallaryDetails ? gallaryDetails[0].communityPics[2] : communityPics[3]})`}}></div>
      </div>
        )}
    </div>
  )
}

export default CommunityBanner