import React from "react";
import { Header2 } from "../../components/User/Header/Header";
import LoginComponent from '../../components/UI/Login'
function Login() {
  
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.7)), url("https://res.cloudinary.com/dxnisjppy/image/upload/v1678359059/wpkwoqgc6ctjqkjeltju.jpg")`,
  };
  return (
      <div className="conatainer-fluid">
        <Header2 />
        <div
          className="bg-no-repeat bg-cover bg-center md:h-screen h-screen w-screen pt-[60px] flex justify-center" // doubt in mobile view
          style={style}
          >
          <div className="bg-gradient-to-t from-transparent to-black absolute w-screen h-64 "></div>
          <LoginComponent />
          <div className="bg-gradient-to-b from-transparent to-black absolute w-screen bottom-0 h-64"></div>
        </div>
      </div>
  );
}

export default Login;
