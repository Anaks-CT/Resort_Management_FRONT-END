import React from 'react'

function CommunityBanner() {
  return (
    <div className='container md:p-36 px-10 mx-auto'>
        <div className='grid md:grid-rows-6 md:grid-flow-col gap-x-20 gap-y-10'>
            <div className='py-24 bg-red-100 row-span-2'></div>
            <div className='py-24 bg-black md:block hidden'></div>
            <div className='py-24 bg-red-100 row-span-2'></div>
            <div className='py-24 bg-black md:block hidden'></div>
            <div className='py-24 bg-black md:block hidden'></div>
            <div className='py-24 bg-red-100 row-span-2'></div>
            <div className='py-24 bg-black md:block hidden'></div>
            <div className='py-24 bg-red-100 row-span-2'></div>

        </div>
    </div>
  )
}

export default CommunityBanner