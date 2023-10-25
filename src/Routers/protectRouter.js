import { Outlet, Navigate } from 'react-router-dom';
import AppContext from '../context/userContext';
import { useContext } from 'react';

export default function ProtectRouter() {
  const { user } = useContext(AppContext);
  const isAuth =  user ? true : false;
  if (isAuth) {
    return  <Outlet />;
  }
}
