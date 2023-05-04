import React from 'react'
import rightArrow  from '../../assets/icons/icons8-right-arrow-24 (2).png'

function MemberTableProfile() {
    const currrentStatusClassname = "bg-white bg-opacity-25 py-2 px-3 border"
  return (
    <>
        <div className='text-center text-xs grid gap-1'>
            <div className='tracking-wider text-5xl lg:text-7xl font-sans'>387</div>
            <div className='tracking-[9px]'>POINTS</div>
            <div className='mt-2 lg:text-base'>You can Apply your points in your next booking</div>
        </div>
        <div className='flex text-xs justify-between lg:justify-center items-center mt-5 lg:gap-3'>
            <div className={`${currrentStatusClassname}`}>MEMBER</div>
            <div className=''><img className='object-fill w-10 lg:w-20 h-6' src={rightArrow} alt="" /></div>
            <div>PLATINUM</div>
            <div className=''><img className='object-fill w-10 lg:w-20 h-6' src={rightArrow} alt="" /></div>
            <div>DIAMOND</div>
        </div>
        <div className='text-xs lg:text-base lg:text-center'>spend INR 2,00,000 to become a platinum member and avail the option of morning food till life.</div>
    </>
  )
}

export default MemberTableProfile