import { Route, Routes, Navigate } from "react-router-dom";
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
import { useSelector } from "react-redux";
import { IStore } from "../interface/slice.interface";
import ProtectedAdminRoute from "../helpers/ProtectedAdminRoute";
import { useEffect, useState } from "react";
import { checkAdminCredentialApi } from "../api/checkAuth";
import { useDispatch } from "react-redux";
import { removeAdminToken } from "../store/slices/adminTokenSlice";

type routers = {
  path: string;
  component: JSX.Element;
};

function AdminRouter() {
  const adminToken = useSelector((state: IStore) => state.adminAuth);
  const [auth, setAuth] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (adminToken.token) {
      checkAdminCredentialApi(adminToken.token)
        .then((res) => setAuth(res.data.message))
        .catch((err) => dispatch(removeAdminToken()))
    } else {
      setAuth(null);
    }
    // eslint-disable-next-line
  }, [adminToken]);
  const publicRoutes: routers[] = [
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
      <Route
        path="/login"
        element={
          !auth ? <AdminLoginPage /> : <Navigate to="/admin/adminDashboard" />
        }
      />
      {publicRoutes.map(({ path, component }) => (
        <Route
          key={path}
          path={path}
          element={ProtectedAdminRoute(component)}
        /> // warning
      ))}
    </Routes>
  );
}

export default AdminRouter;
