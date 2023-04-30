import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IStore } from "../../../interface/slice.interface";

function MiniHeader() {
  const userToken = useSelector((state: IStore) => state.userAuth.token);
  return (
    <div
      id="mini_header"
      className={` flex justify-end items-center py-1 px-12 mx-auto bg-[#2a2a2a] fixed w-screen z-20 top-0`}
    >
      <div className="w-96 flex justify-between items-center md:mr-10">
        <p className="text-white md:text-md text-[12px]">RETRIVE BOOKING</p>
        <div className="flex gap-3">
          {userToken ? (
            <Link to={"/login"}>
            <p className="text-blue-200 md:text-md text-[12px]">PROFILE</p>
          </Link>
          ) : (
            <>
              <Link to={"/login"}>
                <p className="text-blue-200 md:text-md text-[12px]">LOGIN</p>
              </Link>
              <Link to={"/signup"}>
                <p className="text-blue-200 md:text-md text-[12px]">JOIN NOW</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MiniHeader;
