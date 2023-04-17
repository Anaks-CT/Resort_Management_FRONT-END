import React from 'react'
import { useNavigate } from 'react-router-dom';
import { adminLoginApi } from '../../api/company.api';
import { ILoginInterface } from '../../interface/user.interface';
import Login from '../UI/login/Login'
import { useDispatch } from 'react-redux';
import { addAdminToken } from '../../store/slices/adminToken.slice';

function AdminLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const formikLoginSubmit = (values: ILoginInterface, setError: any, resetForm: () => void) => {
      adminLoginApi(values)
          .then((res) => {
            console.log(res.data.token);
            
            dispatch(addAdminToken(res.data.token))
            setError("");
            resetForm();
            navigate("/admin/adminDashboard");
          })
          .catch((err) => {
            setError(err?.response?.data?.message);
          });
    }
  return (
    <div className='w-full flex flex-col justify-center items-center h-full'>
        <Login onSubmit={formikLoginSubmit}/>
    </div>
  )
}

export default AdminLogin