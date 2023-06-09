import React, { useEffect, useState, useRef } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IStore } from "../../../interface/slice.interface";
import { useUserLogout } from "../../../hooks/useLogout";

export function Header2() {
  const location = useLocation();
  const userToken = useSelector((state: IStore) => state.userAuth.token);
  const navigate = useNavigate();
  const [menuToggler, setToggle] = useState(false);
  const [scrolldown, setscrolldown] = useState(false);
  const handleToggle = () => {
    setToggle(!menuToggler);
  };

  // logout hook
  const logout = useUserLogout()
  ////////////////////////////////////// togging the meny toggle according to window size//////////////////////////////////////
  useEffect(() => {
    window.innerWidth > 768 && setToggle(true);
    window.addEventListener("resize", () => {
      window.innerWidth < 768 ? setToggle(false) : setToggle(true);
      return () => {
        window.removeEventListener("resize", () => {});
      };
    });
  }, []); // doubt should there be a dependanct array

  ///////////////////////////////////// desappearing the first header when scrolling down by toggling the scrolldown state/////////

  const lastScrollTop = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop.current) {
        setscrolldown(true);
      } else if (st < lastScrollTop.current) {
        setscrolldown(false);
      }
      lastScrollTop.current = st <= 0 ? 0 : st;
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div
        id="mini_header"
        className={`${
          scrolldown && "invisible"
        } flex justify-end items-center py-1 px-12 mx-auto bg-[#2a2a2a] fixed w-screen z-20 top-0`}
      >
        <div className="w-96 flex justify-between items-center md:mr-10">
          {/* link tag */}{" "}
          <p className="text-white md:text-md text-[12px] cursor-pointer" onClick={()=>navigate('/profile/bookings')}>RETRIVE BOOKING</p>
          <div className="flex gap-3">
            {userToken ? (
              <>
                {location.pathname === "/profile" ||
                location.pathname.startsWith("/profile/") ? (
                  <p className="text-blue-200 md:text-md text-[12px] cursor-pointer" onClick={() => logout()}>LOGOUT</p>
                ) : (
                  <Link to={"/profile"}>
                    <p className="text-blue-200 md:text-md text-[12px]">
                      PROFILE
                    </p>
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to={"/login"}>
                  <p className="text-blue-200 md:text-md text-[12px]">LOGIN</p>
                </Link>
                <Link to={"/signup"}>
                  <p className="text-blue-200 md:text-md text-[12px]">
                    JOIN NOW
                  </p>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className={`py-4 px-12 mx-auto bg-black fixed w-screen opacity-75 z-20 ${
          scrolldown ? "top-0" : "top-[26px]"
        }`}
      >
        <div className={`md:flex`}>
          <Link to={"/"} className="md:w-1/5">
            <div
              className={` ${
                menuToggler && `pb-12`
              } md:pb-0 items-center flex justify-start text-white text-xl md:text-3xl font-bold tracking-widest`}
            >
              TRINITY
            </div>
          </Link>
          {menuToggler && (
            <>
              <div
                className={`md:w-1/5 w-screen pb-5 md:pb-0 items-center flex justify-start md:justify-end text-white text-md md:text-lg tracking-wide cursor-pointer`}
                onClick={() => navigate("/resorts")}
              >
                RESORTS
              </div>
              <div
                className={`md:w-1/5 w-screen pb-5 md:pb-0 items-center flex justify-start md:justify-center text-white text-md md:text-lg tracking-wide`}
              >
                <Link to={"/dining"}>
                  <p>DINING</p>
                </Link>
              </div>
              <div
                className={`md:w-1/5 w-screen pb-5 md:pb-0 items-center flex justify-start text-white text-md md:text-lg tracking-wide`}
              >
                <Link to={"/wellness"}>
                  <p>WELLNESS</p>
                </Link>
              </div>
            </>
          )}
          <div className="absolute top-5 right-20">
            <Link
              to={userToken ? "/booking/explore" : "/login"}
              className="text-white md:text-lg text-sm bg-premium p-2 rounded-lg"
            >
              BOOKING
            </Link>
          </div>
          <div className="md:invisible" onClick={handleToggle}>
            {" "}
            <AiOutlineMenu className="text-white absolute top-4 right-8 text-3xl md:right-5" />{" "}
          </div>
        </div>
      </div>
    </>
  );
}
