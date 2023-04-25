import React, { useState } from 'react'
import { BsDiamond } from 'react-icons/bs'

function RoomDetails() {
    const [toggleDetail, setToggleDetail] = useState<1 | 2 | 3>(1)
  return (
    <>
        <div className='flex text-xs justify-between mb-6'>
            <span onClick={() => setToggleDetail(1)} className={`font-sans text-premium ${toggleDetail === 1 && "underline"}`}>HIGHLIGHTS</span>
            <span onClick={() => setToggleDetail(2)} className={`font-sans text-premium ${toggleDetail === 2 && "underline"}`}>AMENITIES</span>
            <span onClick={() => setToggleDetail(3)} className={`font-sans text-premium ${toggleDetail === 3 && "underline"}`}>FACILITIES</span>
        </div>
        <div className='text-xs flex flex-col gap-3'>
            <div className='flex gap-3'>
                <div><BsDiamond /></div>
                <div>A king bed or twin beds (subject to availability)</div>
            </div>
            <div className='flex gap-3'>
                <div><BsDiamond /></div>
                <div>Can accommodate a combination of up to 3 adult(s) and 2 children from age 11 and below whereby the total max occupancy cannot exceed 4 guest(s)</div>
            </div>
            
        </div>
    </>
  )
}

export default RoomDetails