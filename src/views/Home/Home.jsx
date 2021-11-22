import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '@/components/Loading/Loading';

const Home = () => {
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem('x-auth-token');
    if (token) {
      // 做请求
    } else {
      // 显示loading
      setShowLoading(true);

      // 跳转到登录页 Login
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  }, [navigate]);

  return (
    <div>
      <h2>首页</h2>
      <Loading showLoading={showLoading}></Loading>
    </div>
  );
};

export default Home;
