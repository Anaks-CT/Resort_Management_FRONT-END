import React from 'react'
import { Header2 } from '../../components/User/Header/Header'
import NewPasswordForm from '../../components/User/Auth/NewPasswordForm';

function NewPasswordPage() {
    const style = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.7)), url("https://res.cloudinary.com/dxnisjppy/image/upload/v1678359059/wpkwoqgc6ctjqkjeltju.jpg")`,
      };
  return (
    <>
      <Header2 />
      <div
        className="static bg-no-repeat bg-cover bg-center h-screen pt-[60px] flex justify-center"
        style={style}
      >
        <div className="bg-gradient-to-t from-transparent to-black absolute w-screen h-64 "></div>
        <NewPasswordForm />
        <div className="bg-gradient-to-b from-transparent to-black absolute w-screen bottom-0 h-64"></div>
      </div>
    </>
  )
}

export default NewPasswordPage