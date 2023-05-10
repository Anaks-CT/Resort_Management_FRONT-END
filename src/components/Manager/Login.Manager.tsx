import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { ILoginInterface } from '../../interface/user.interface';
import Login from '../UI/login/Login'
import { useDispatch } from 'react-redux';
import { addAdminToken } from '../../store/slices/adminTokenSlice';
import { managerLoginApi } from '../../api/manager.api';
import { addManagerToken } from '../../store/slices/managerTokenSlice';

function ManagerLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
  const [loading, setloading] = useState(false)
    
    const formikLoginSubmit = (values: ILoginInterface, setError: any, resetForm: () => void) => {
      setloading(true)
      managerLoginApi(values)
          .then((res) => {
            dispatch(addManagerToken(res.data.token))
            setError("");
            resetForm();
            navigate("/manager/dashboard");
          })
          .catch((err) => setError(err?.response?.data?.message))
          .finally(() => setloading(false))
    }
  return (
    <div className='w-full flex flex-col justify-center items-center h-full'>
        <Login onSubmit={formikLoginSubmit} loading={loading}/>
    </div>
  )
}

export default ManagerLogin