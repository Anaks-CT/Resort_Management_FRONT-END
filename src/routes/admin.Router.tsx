import { Route, Routes } from "react-router";
import { AdminDashboard, AdminLoginPage, PageNotFoundAdmin } from "../pages/pages";

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
      path: "/dashboard",
      component: <AdminDashboard />
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
