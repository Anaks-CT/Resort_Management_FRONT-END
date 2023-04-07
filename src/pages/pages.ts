//////////////////////////////////// user ////////////////////////////////

import DIningPage from "./user/DIningPage";
import HomePage from "./user/HomePage";
import LoginPage from "./user/LoginPage";
import SignupPage from "./user/SignupPage";
import WellnessPage from "./user/WellnessPage";
import NotFoundPage from "./user/404Page";

////////////////////////////////// manager //////////////////////////////

import ManagerLoginPage from "./manager/LoginPage.Manager";
import ManagerPageNotFound from "./manager/404Page.Manager";
import GallaryManagement from "./manager/GallaryManagement.Manager";

///////////////////////////////// admin /////////////////////////////////

import AdminLoginPage from "./admin/LoginPage.Admin";
import PageNotFoundAdmin from "./admin/404Page.Admin";
import AdminDashboard from "./admin/Dashboard.Admin";
import GallaryManagementAdmin from "./admin/GallaryManagement.Admin";
import ResortDashboard from "./admin/ResortDashboard.Admin";
import ResortRoom from "./admin/ResortRoom.Admin";
import ResortManagement from "./admin/ResortManagement.Admin";
import AddResort from "./admin/AddResort.Admin";
import FaqManagementPage from "./admin/FaqManagement.Admin";

///////////////////////////////// user export ///////////////////////////

export {
  LoginPage,
  SignupPage,
  HomePage,
  WellnessPage,
  DIningPage,
  NotFoundPage,
};

///////////////////////////////////manager export /////////////////////////////////

export { ManagerLoginPage, ManagerPageNotFound, GallaryManagement };

/////////////////////////////////// admin export /////////////////////////////////

export {
  AdminLoginPage,
  PageNotFoundAdmin,
  AdminDashboard,
  GallaryManagementAdmin,
  ResortDashboard,
  ResortRoom,
  ResortManagement,
  AddResort,
  FaqManagementPage
};
