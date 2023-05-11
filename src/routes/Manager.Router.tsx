import { Route, Routes, Navigate } from "react-router-dom";
import {
  GallaryManagement,
  DashboardManager,
  ManagerLoginPage,
  ManagerPageNotFound,
  UserManagementManager,
  BookingManagementManager,
  RoomManagementManager,
  CustomizeRoomManager,
} from "../pages/pages";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAdminCredentialApi, checkManagerCredentialApi } from "../api/checkAuth";
import { removeManagerToken } from "../store/slices/managerTokenSlice";
import { IStore } from "../interface/slice.interface";
import ProtectedManagerRoute from "../helpers/ProtectedManagerRoute";
import ManagerLayout from "../layouts/ManagerLayout";

type routers = {
  path: string;
  component: JSX.Element;
};

function ManagerRouter() {
  const managerToken = useSelector((state: IStore) => state.managerAuth.token);
  const [auth, setAuth] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (managerToken) {
      checkManagerCredentialApi(managerToken)
        .then((res) => setAuth(res.data.message))
        .catch((err) => dispatch(removeManagerToken()));
    } else {
      setAuth(null);
    }
    // eslint-disable-next-line
  }, [managerToken]);
  const publicRoutes: routers[] = [
    {
      path: "/gallary",
      component: <GallaryManagement />,
    },
    {
      path: "/dashboard",
      component: <DashboardManager />,
    },
    {
      path: "/users",
      component: <UserManagementManager />,
    },
    {
      path: "/booking",
      component: <BookingManagementManager />,
    },
    {
      path: "/room",
      component: <RoomManagementManager />,
    },
    {
      path: "/room/customize",
      component: <CustomizeRoomManager />,
    },
  ];
  return (
    <Routes>
      <Route
        path="/login"
        element={
          !auth ? <ManagerLoginPage /> : <Navigate to="/manager/dashboard" />
        }
      />

      <Route element={<ManagerLayout />}>
        {publicRoutes.map(({ path, component }) => (
          <Route key={path} path={path} element={component} /> // warning
        ))}
      </Route>

      <Route
        path={"/*"}
        element={ProtectedManagerRoute(<ManagerPageNotFound />)}
      />
    </Routes>
  );
}

export default ManagerRouter;
