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
  BookingManagement,
  UserManagement,
} from "../pages/pages";
import { useSelector } from "react-redux";
import { IStore } from "../interface/slice.interface";
import ProtectedAdminRoute from "../helpers/ProtectedAdminRoute";
import { useEffect, useState } from "react";
import { checkAdminCredentialApi } from "../api/checkAuth";
import { useDispatch } from "react-redux";
import { removeAdminToken } from "../store/slices/adminTokenSlice";
import ManagerLayout from "../layouts/ManagerLayout";
import AdminLayout from "../layouts/AdminLayout";

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
        .catch((err) => dispatch(removeAdminToken()));
    } else {
      setAuth(null);
    }
    // eslint-disable-next-line
  }, [adminToken]);
  const adminRoutes: routers[] = [
    {
      path: "/dashboard",
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
  ];

  const resortRoutes: routers[] = [
    {
      path: `/:resort/dashboard`,
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
      path: `/:resort/booking`,
      component: <BookingManagement />
    },
    {
      path: `/:resort/users`,
      component: <UserManagement />
    }
  ];
  return (
    <Routes>
      <Route
        path="/login"
        element={
          !auth ? <AdminLoginPage /> : <Navigate to="/admin/dashboard" />
        }
      />
      
      <Route element={<AdminLayout />}>
        {adminRoutes.map(({ path, component }) => (
          <Route
            key={path}
            path={path}
            element={ProtectedAdminRoute(component)}
          /> // warning
        ))}
      </Route>

      <Route element={<ManagerLayout />}>
        {resortRoutes.map(({ path, component }) => (
          <Route
            key={path}
            path={path}
            element={ProtectedAdminRoute(component)} 
          />
        ))}
        <Route path={"/*"} element={ProtectedAdminRoute(<PageNotFoundAdmin />)} />
      </Route>

    </Routes>
  );
}

export default AdminRouter;
