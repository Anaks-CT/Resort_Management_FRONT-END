import React from 'react'
import AdminLogin from '../../components/Manager/Login.Admin'
import { Header } from '../../components/Manager/Header'

function LoginPage() {
  return (
    <div className='bg-slate-400 w-full h-screen'>
      <Header />
      <AdminLogin />
    </div>
  )
}

export default LoginPage