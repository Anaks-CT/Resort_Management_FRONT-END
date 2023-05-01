import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router";
import { BookingConfirmPage, BookingForm1, BookingStayPage, DIningPage, HomePage, LoginPage, NotFoundPage, OtpPage, ResortHomePage, ResortsListPage, SignupPage, WellnessPage } from "../pages/pages";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IStore } from "../interface/slice.interface";
import { checkUserCredentialApi } from "../api/checkAuth";
import { removeUserToken } from "../store/slices/userTokenSlice";
import ProtectedUserRoute from "../helpers/ProtectedUserRoute";



function UserRouter() {
  const userToken = useSelector((state: IStore) => state.userAuth.token);
  const [auth, setAuth] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userToken) {
      checkUserCredentialApi(userToken)
        .then((res) => setAuth(res.data.message))
        .catch((err) => {
          setAuth(null)
          dispatch(removeUserToken());
        });
    } else {
      setAuth(null);
    }
    // eslint-disable-next-line
  }, [userToken]);

  console.log(auth, userToken);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/resorts" element={<ResortsListPage />} />
      <Route path="/wellness" element={<WellnessPage />} />
      <Route path="/dining" element={<DIningPage />} />
      <Route path="/:resort" element={<ResortHomePage />} />

      <Route path="/login" element={!auth ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/signup" element={!auth ? <SignupPage /> : <Navigate to="/" />} />
      <Route path="/signup/otp-verify" element={!auth ? <OtpPage /> : <Navigate to="/" />} />

      <Route path="/booking/explore" element={ProtectedUserRoute(<BookingForm1 />)} />
      <Route path="/booking/stay" element={ProtectedUserRoute(<BookingStayPage />)} />
      <Route path="/booking/confirm" element={ProtectedUserRoute(<BookingConfirmPage />)} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default UserRouter;
