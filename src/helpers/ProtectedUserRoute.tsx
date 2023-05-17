import React, { useEffect, useState } from "react";
import { checkUserCredentialApi } from "../api/checkAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IStore } from "../interface/slice.interface";
import { useDispatch } from "react-redux";
import { removeUserToken } from "../store/slices/userTokenSlice";

function ProtectedUserRoute(component: JSX.Element) {
  const userToken = useSelector((state: IStore) => state.userAuth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [auth, setAuth] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userToken) {
      setLoading(true);
      checkUserCredentialApi(userToken)
        .then((res) => setAuth(true))

        .catch((err) => {
          navigate("/login");
          dispatch(removeUserToken());
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      setAuth(false);
    }
    // eslint-disable-next-line
  }, [userToken]);

  if (loading)
    return (
      <div className="flex justify-center">
        <img
          width={50}
          src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1680669482/Spinner-1s-200px_4_ontbds.gif"
          alt=""
        />
      </div>
    );
  if (auth === null) return;

  return auth ? component : <Navigate to={"/login"} />;
}

export default ProtectedUserRoute;
