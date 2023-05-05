import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { 
  BookingConfirmPage,
  BookingDetailsPage,
  BookingForm1,
  BookingStayPage, 
  DIningPage, 
  ForgotPasswordOtpVerifyPage, 
  ForgotPasswordPage, 
  HomePage, 
  LoginPage, 
  MemberPage, 
  NewPasswordPage, 
  NotFoundPage, 
  OtpPage, 
  PersonalPage, 
  ResortHomePage, 
  ResortsListPage, 
  SignupPage, 
  WellnessPage, 
  WishlistPage
} from "../pages/pages";
import CheckAuthRoute from "../helpers/CheckAuthInRoute";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IStore } from "../interface/slice.interface";
import { useDispatch } from "react-redux";
import { checkUserCredentialApi } from "../api/checkAuth";
import { removeUserToken } from "../store/slices/userTokenSlice";



function UserRouter() {
  const userToken = useSelector((state: IStore) => state.userAuth.token)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [auth, setAuth] = useState<String | null>(null)

  useEffect(() => {
    if(userToken){
      checkUserCredentialApi( userToken) 
        .then(res => setAuth(res.data.message))
        .catch(err => {
          navigate('/login')
          dispatch(removeUserToken())
        })
    }
    // eslint-disable-next-line
  },[userToken])


  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/resorts" element={<ResortsListPage />} />
      <Route path="/wellness" element={<WellnessPage />} />
      <Route path="/dining" element={<DIningPage />} />
      <Route path="/:resort" element={<ResortHomePage />} />

      <Route path="/signup" element={CheckAuthRoute(<SignupPage />)} />
      <Route path="/login" element={CheckAuthRoute(<LoginPage />)} />
      <Route path="/signup/otp-verify" element={CheckAuthRoute(<OtpPage />)} />
      <Route path="/forgotPassword" element={CheckAuthRoute(<ForgotPasswordPage />)} />
      <Route path="/forgotPassword/otp-verify" element={CheckAuthRoute(<ForgotPasswordOtpVerifyPage />)} />
      <Route path="/forgotPassword/setNewPassword" element={CheckAuthRoute(<NewPasswordPage />)} />

      <Route path="/booking/explore" element={auth ? (<BookingForm1 />) : <Navigate to={'/login'}/>} />
      <Route path="/booking/stay" element={auth ? (<BookingStayPage />) : <Navigate to={'/login'}/>} />
      <Route path="/booking/confirm" element={auth ? (<BookingConfirmPage />) : <Navigate to={'/login'}/>} />
      <Route path="/profile" element={auth ? (<PersonalPage />) : <Navigate to={'/login'}/>} />
      <Route path="/profile/member" element={auth ? (<MemberPage />) : <Navigate to={'/login'}/>} />
      <Route path="/profile/bookings" element={auth ? (<BookingDetailsPage />) : <Navigate to={'/login'}/>} />
      <Route path="/profile/wishlist" element={auth ? (<WishlistPage />) : <Navigate to={'/login'}/>} />

      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default UserRouter;
