import { Route, Routes } from "react-router";
import {
  ResortManagement,
  AdminDashboard,
  AdminLoginPage,
  GallaryManagementAdmin,
  PageNotFoundAdmin,
  ResortDashboard,
  ResortRoom,
  AddResort,
  FaqManagementPage,
  RoomCustomize,
  MangerManagement,
} from "../pages/pages";

type routers = {
  path: string;
  component: JSX.Element;
};

function AdminRouter() {
  const publicRoutes: routers[] = [
    {
      path: "/login",
      component: <AdminLoginPage />,
    },
    {
      path: "/adminDashboard",
      component: <AdminDashboard />,
    },
    {
      path: "/resortmanagement",
      component: <ResortManagement />,
    },
    {
      path: "/managerManagement",
      component: <MangerManagement />,
    },
    {
      path: "/faqManagement",
      component: <FaqManagementPage />,
    },
    {
      path: "/addResort",
      component: <AddResort />,
    },
    {
      path: `/:resort/dashboard`, // path parameters(for middle), router state, router object
      component: <ResortDashboard />,
    },
    {
      path: `/:resort/gallary`,
      component: <GallaryManagementAdmin />,
    },
    {
      path: `/:resort/room`,
      component: <ResortRoom />,
    },
    {
      path: `/:resort/room/customizeRoom`,
      component: <RoomCustomize />,
    },
    {
      path: "/*",
      component: <PageNotFoundAdmin />,
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

export default AdminRouter;
