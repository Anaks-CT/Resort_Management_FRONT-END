import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import UserRouter from "./routes/User.Router";
import ManagerRouter from "./routes/Manager.Router";
import { ToastContainer } from "react-toastify";
import AdminRouter from "./routes/Admin.Router";
import ScrollToTop from "./components/UI/ScrollToTop";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/manager/*"  element={<ManagerRouter />} />
          <Route path="/admin/*" element={<AdminRouter />} />
          <Route path="/*" element={<UserRouter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
