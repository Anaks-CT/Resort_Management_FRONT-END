import React, { useEffect, useState } from "react";
import ProfileSidebar from "../../../components/User/Sidebar";
import { Header2 } from "../../../components/User/Header/Header";
import ProfileNavbar from "../../../components/User/ProfileNavbar";
import SingleWishlist from "../../../components/User/SingleWishlist";
import Button from "../../../components/UI/Button";
import { useNavigate } from "react-router-dom";
import { getWishlistOfUserApi } from "../../../api/user.api";
import { useSelector } from "react-redux";
import { IStore } from "../../../interface/slice.interface";
import { IWishlist } from "../../../interface/wishlist.interface";

function WishlistPage() {
  // background image style
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0),rgba(0, 0, 0, 0.5)), url("https://res.cloudinary.com/dhcvbjebj/image/upload/v1683088154/wallpaperflare.com_wallpaper_1_txni0h.jpg")`,
  };
  const [error, setError] = useState("");
  const [wishlistDetails, setWishlistDetails] = useState<IWishlist[]>();
  const navigate = useNavigate();
  const userToken = useSelector((state: IStore) => state.userAuth.token);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getWishlistOfUserApi(userToken)
      .then((res) => setWishlistDetails(res.data.data))
      .catch((err) => setError(err?.response?.data?.message))
      .finally(() => setLoading(false));
  }, []);
  const wishlists = wishlistDetails?.map((item) => (
    <SingleWishlist
      singleWishlist={item}
      setWishlistDetails={setWishlistDetails}
    />
  ));
  return (
    <>
      <ProfileSidebar />
      <Header2 />
      <div
        className="bg-no-repeat bg-cover bg-center min-h-screen  text-white w-screen pt-[60px] flex justify-center" // doubt in mobile view
        style={style}
      >
        <div className="mt-10 md:mt-20 z-10 px-3 w-full flex flex-col md:items-center">
          <div className="text-sm md:text-2xl md:tracking-widest tracking-wide text-center flex justify-around items-center">
            WELCOME TO TRINITY, ANAKS
          </div>
          <ProfileNavbar currentNav="wishlist" />

          <div className="border border-premium md:border-2 my-5 max-w-[900px] lg:w-[900px] md:min-w-[600px]">
            <div className="p-3 bg-white bg-opacity-25 relative  ">
              <div className="text-white text-center absolute right-0 top-3 w-full tracking-wide">
                YOUR WISHLIST
              </div>
              <div className="text-white grid gap-6 mt-10 p-2 max-h-[440px] overflow-y-auto scroll-0 rounded">
                {error && (
                  <>
                    <div className="text-center text-sm">{error}</div>
                    <div className="text-center">
                      <Button
                        class="text-sm md:w-44 w-full"
                        onClick={navigate}
                        OnClickItem={"/booking/explore"}
                        color="premium"
                      >
                        BOOK ROOMS
                      </Button>
                    </div>
                  </>
                )}
                {loading && (
                  <div className="flex justify-center">
                    <img
                      width={50}
                      src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1680669482/Spinner-1s-200px_4_ontbds.gif"
                      alt=""
                    />
                  </div>
                )}
                {wishlists && wishlists?.length > 0 ? wishlists : (!loading && <div className="text-center text-sm">You don't have saved Dates !!</div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WishlistPage;
