import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import './Tabbar.less';
import home_1 from '@/assets/images/tabbar/home_1.png';
import home_2 from '@/assets/images/tabbar/home_2.png';
import fast from '@/assets/images/tabbar/fast.png';
import my_1 from '@/assets/images/tabbar/my_1.png';
import my_2 from '@/assets/images/tabbar/my_2.png';

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
});

export default function Tabbar() {
  const classes = useStyles();

  const location = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState(0);
  const [showTabbar, setShowTabbar] = useState(true);

  // 做判断，根据当前的路由地址，决定 value 等于多少
  useEffect(() => {
    switch (location.pathname) {
      case '/home':
        setValue(0);
        setShowTabbar(true);
        break;
      case '/fast':
        setValue(1);
        setShowTabbar(true);
        break;
      case '/user':
        setValue(2);
        setShowTabbar(true);
        break;
      default:
        setValue(0);
        setShowTabbar(false);
        break;
    }
  }, [location.pathname]);

  return (
    <BottomNavigation
      value={value}
      style={{ display: showTabbar ? 'flex' : 'none' }}
      onChange={(event, newValue) => {
        setValue(newValue);
        switch (newValue) {
          case 0:
            navigate('/home');
            break;
          case 1:
            navigate('/fast');
            break;
          case 2:
            navigate('/user');
            break;
          default:
            break;
        }
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="首页"
        icon={<img src={value === 0 ? home_1 : home_2} alt="" />}
      />
      <BottomNavigationAction label="快速刷题" icon={<img src={fast} alt="" />} />
      <BottomNavigationAction label="我的" icon={<img src={value === 2 ? my_1 : my_2} alt="" />} />
    </BottomNavigation>
  );
}
