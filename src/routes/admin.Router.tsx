import { Route, Routes } from "react-router";
import { ResortManagement, AdminDashboard, AdminLoginPage, GallaryManagementAdmin, PageNotFoundAdmin, ResortDashboard, ResortRoom, AddResort } from "../pages/pages";
import { useSelector } from "react-redux";
import { IResort } from "../interface/resort.interface";
import { IGallary } from "../interface/gallary.interface";

type routers = {
  path: string;
  component: JSX.Element;
};

type store = {
  resort: {resortId: string, resortName: string}
  gallary: IGallary
}

function AdminRouter() {
  const currentResort = useSelector((state: store) => state.resort)
  const publicRoutes: routers[] = [
    {
      path: "/login",
      component: <AdminLoginPage />,
    },
    {
      path: "/adminDashboard",
      component: <AdminDashboard />
    },
    {
      path: "/resortmanagement",
      component: <ResortManagement />
    },
    {
      path: "/addResort",
      component: <AddResort />
    },
    {
      path: `/${currentResort.resortName}/dashboard`,
      component: <ResortDashboard />,
    },
    {
      path: `/${currentResort.resortName}/gallary`,
      component: <GallaryManagementAdmin />,
    },
    {
      path: `/${currentResort.resortName}/room`,
      component: <ResortRoom  />,
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
