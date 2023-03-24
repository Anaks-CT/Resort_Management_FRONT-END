import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import UserRouter from "./routes/User.Router";
import ManagerRouter from "./routes/Manager.Router";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/manager/*" element={<ManagerRouter />} />
          <Route path="/*" element={<UserRouter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
