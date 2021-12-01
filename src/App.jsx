import React, { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import './App.less';
import MyAlert from '@/components/MyAlert/MyAlert';
import Tabbar from '@/components/Tabbar/Tabbar';

const App = props => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/home');
    }
  });
  return (
    <div>
      <MyAlert />
      {props.children}
      <Outlet />
      <Tabbar />
    </div>
  );
};

export default App;
