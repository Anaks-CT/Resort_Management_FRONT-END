import React from 'react'
import { Link } from 'react-router-dom'

function MiniHeader() {
  return (
    <div
        id="mini_header"
        className={` flex justify-end items-center py-1 px-12 mx-auto bg-[#2a2a2a] fixed w-screen z-20 top-0`}
      >
        <div className="w-96 flex justify-between items-center md:mr-10">
          {/* link tag */}{" "}
          <p className="text-white md:text-md text-[12px]">RETRIVE BOOKING</p>
          <div className="flex gap-3">
            <Link to={"/login"}>
              <p className="text-blue-200 md:text-md text-[12px]">LOGIN</p>
            </Link>
            <Link to={"/signup"}>
              <p className="text-blue-200 md:text-md text-[12px]">JOIN NOW</p>
            </Link>
          </div>
        </div>
      </div>
  )
}

export default MiniHeader