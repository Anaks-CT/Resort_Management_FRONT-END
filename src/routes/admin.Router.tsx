import { Route, Routes } from "react-router";
import { ResortManagement, AdminDashboard, AdminLoginPage, GallaryManagementAdmin, PageNotFoundAdmin, ResortDashboard, ResortRoom, AddResort, FaqManagementPage } from "../pages/pages";
import { useSelector } from "react-redux";
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
      path: "/faqManagement",
      component: <FaqManagementPage />
    },
    {
      path: "/addResort",
      component: <AddResort />
    },
    {
      path: `/${currentResort.resortName}/dashboard`,// path parameters(for middle), router state, router object
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
