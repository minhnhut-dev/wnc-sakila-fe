import { Outlet, Navigate } from 'react-router-dom';
import AppContext from '../context/userContext';
import { toastError } from "../services/toastService";
import { useContext } from 'react';

export default function PrivateRoutes() {
  const { user } = useContext(AppContext);
  const isAuth =  user ? true : false;
  if (!isAuth) {
    toastError("User not authenticated");
  }
  return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
}
