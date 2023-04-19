import React from "react";
import { Route, Routes } from "react-router";
import { BookingForm1, DIningPage, HomePage, LoginPage, NotFoundPage, SignupPage, WellnessPage } from "../pages/pages";

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
