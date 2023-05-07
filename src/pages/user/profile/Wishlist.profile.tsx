import React, { useEffect, useState } from "react";
import SingleWishlist from "../../../components/User/profile/SingleWishlist";
import Button from "../../../components/UI/Button";
import { useNavigate } from "react-router-dom";
import { getWishlistOfUserApi } from "../../../api/user.api";
import { useSelector } from "react-redux";
import { IStore } from "../../../interface/slice.interface";
import { IWishlist } from "../../../interface/wishlist.interface";

function WishlistPage() {
 
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
      // eslint-disable-next-line
  }, []);
  const wishlists = wishlistDetails?.map((item) => (
    <SingleWishlist
      singleWishlist={item}
      setWishlistDetails={setWishlistDetails}
    />
  ));
  return (
    <>

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
    </>
  );
}

export default WishlistPage;
