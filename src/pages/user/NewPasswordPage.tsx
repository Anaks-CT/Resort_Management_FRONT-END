import React, { useEffect } from 'react'
import NewPasswordForm from '../../components/User/Auth/NewPasswordForm';
import { useLocation, useNavigate } from 'react-router-dom';

function NewPasswordPage() {
  const location = useLocation()
const navigate = useNavigate()
  const email = location?.state?.email

  useEffect(() => {
    if (!location?.state?.email) navigate("/");
  });


  return (

        <NewPasswordForm email={email}/>
        
  )
}

export default NewPasswordPage