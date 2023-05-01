import { Route, Routes } from "react-router";
import { 
  BookingConfirmPage,
  BookingForm1,
  BookingStayPage, 
  DIningPage, 
  ForgotPasswordOtpVerifyPage, 
  ForgotPasswordPage, 
  HomePage, 
  LoginPage, 
  NewPasswordPage, 
  NotFoundPage, 
  OtpPage, 
  ResortHomePage, 
  ResortsListPage, 
  SignupPage, 
  WellnessPage 
} from "../pages/pages";
import ProtectedUserRoute from "../helpers/ProtectedUserRoute";
import CheckAuthRoute from "../helpers/CheckAuthInRoute";



function UserRouter() {

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

      <Route path="/booking/explore" element={ProtectedUserRoute(<BookingForm1 />)} />
      <Route path="/booking/stay" element={ProtectedUserRoute(<BookingStayPage />)} />
      <Route path="/booking/confirm" element={ProtectedUserRoute(<BookingConfirmPage />)} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default UserRouter;
