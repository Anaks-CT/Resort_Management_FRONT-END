import React, { useState } from "react";
import LoginComponent from "../../components/UI/login/Login";
import { loginApi } from "../../api/user.api";
import { ILoginInterface } from "../../interface/user.interface";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserToken } from "../../store/slices/userTokenSlice";
function Login() {
  const location = useLocation();
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formikLoginSubmit = (
    values: ILoginInterface,
    setError: any,
    resetForm: () => void
  ) => {
    setloading(true);
    loginApi(values)
      .then((res) => {
        dispatch(addUserToken(res.data.token));
        setError("");
        resetForm();
        navigate("/");
      })
      .catch((err) => setError(err?.response?.data?.message))
      .finally(() => setloading(false));
  };
  return (
    <LoginComponent
      onSubmit={formikLoginSubmit}
      message={location?.state?.message}
      loading={loading}
    />
  );
}

export default Login;
