import React from "react";
import { Route, Routes } from "react-router";
import { BookingConfirmPage, BookingForm1, BookingStayPage, DIningPage, HomePage, LoginPage, NotFoundPage, OtpPage, SignupPage, WellnessPage } from "../pages/pages";

type routers = {
    path: string;
    component: JSX.Element;
}

function UserRouter() {
  const publicRoutes:routers[] = [
    {
      path: "/",
      component: <HomePage />,
    },
    {
      path: "/login",
      component: <LoginPage />,
    },
    {
      path: "/signup",
      component: <SignupPage />,
    },
    {
      path: "/signup/otp-verify",
      component: <OtpPage />,
    },
    {
      path: '/wellness',
      component: <WellnessPage />
    },
    {
      path: '/dining',
      component: <DIningPage />
    },
    {
      path: '/booking/explore',
      component: <BookingForm1 />
    },
    {
      path: '/booking/stay',
      component: <BookingStayPage />
    },
    {
      path: '/booking/confirm',
      component: <BookingConfirmPage />
    },
    {
      path: '/*',
      component: <NotFoundPage />
    }
  ];
  return (
    <Routes>
     {publicRoutes.map(({path, component}) => (
        <Route key={path} path={path} element={component} /> // warning
      ))}
    </Routes>
  );
}

export default UserRouter;
