import { Route, Routes } from "react-router";
import { GallaryManagement, ManagerLoginPage, ManagerPageNotFound } from "../pages/pages";

type routers = {
  path: string;
  component: JSX.Element;
};

function ManagerRouter() {
  const publicRoutes: routers[] = [
    {
      path: "/login",
      component: <ManagerLoginPage />,
    },
    {
        path: "/gallary",
        component: <GallaryManagement />,
    },
    {
      path: "/*",
      component: <ManagerPageNotFound />,
    },
  ];
  return (
    <Routes>
      {publicRoutes.map(({ path, component }) => (
        <Route key={path} path={path} element={component} /> // warning
      ))}
    </Routes>
  );
}

export default ManagerRouter;
