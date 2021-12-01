import React from 'react';
import { useNavigate } from 'react-router';
import './Goback.less';

const Goback = () => {
  const navigate = useNavigate();

  const gobackFn = () => {
    navigate(-1);
  };

  return (
    <div
      className="goback"
      onClick={() => {
        gobackFn();
      }}
    >
      返回上一页
    </div>
  );
};

export default Goback;
