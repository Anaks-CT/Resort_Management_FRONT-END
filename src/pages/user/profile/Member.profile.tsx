import React, { useEffect, useState } from "react";
import MemberTableProfile from "../../../components/User/profile/MemberTableProfile";
import { useSelector } from "react-redux";
import { IStore } from "../../../interface/slice.interface";
import { getUserDetailsApi } from "../../../api/user.api";

function MemberPage() {
  const [loading, setLoading] = useState(false)
  const [userDetails, setUser] = useState()
  // getting user token from redux
  const userToken = useSelector((state: IStore) => state.userAuth.token);
  // fetching user Detials
  useEffect(() => {
    setLoading(true);
    getUserDetailsApi(userToken)
      .then((res) => setUser(res.data.data))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);
  return (
<>
{loading ? (
      <div className="flex justify-center">
        <img
          width={50}
          src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1680669482/Spinner-1s-200px_4_ontbds.gif"
          alt=""
        />
      </div>
    ) : (
      <div className="text-white grid gap-5 p-2 max-h-[440px] overflow-y-auto scroll-0 rounded">
      <MemberTableProfile userDetails={userDetails}/>
    </div>
    )}
</>
    
  );
}

export default MemberPage;
