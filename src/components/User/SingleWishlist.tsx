import React from 'react'
import Button from '../UI/Button'

function SingleWishlist() {
  return (
    <div className="p-3 py-5 text-black bg-white grid gap-2 rounded ">

      <div className="grid gap-2 md:gap-0 md:divide-x md:flex md:justify-between  text-xs pl-3 lg:mx-0">
        <div className="grid gap-2 md:w-3/5 ">
          <div className="flex  justify-between items-center">
            <div className="w-1/2">HOTEL NAME</div>
            <div className="w-1/2">: RESORT 3</div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2">NO. OF ROOM(S)</div>
            <div className="w-1/2">: 1</div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2">NO. OF GUEST(S)</div>
            <div className="w-1/2">: 6</div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2">NO. OF DAY(S)</div>
            <div className="w-1/2">: 3</div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2">DATE</div>
            <div className="w-1/2 md:whitespace-nowrap">: 2 MARCH - 4 MARCH 2023</div>
          </div>
        </div>
        <div className='mx-auto my-auto'><Button class='py-2 px-3 font-black' outline color='grey'>CHECK AVAILABILITY</Button></div>
      </div>
    </div>
  )
}

export default SingleWishlist