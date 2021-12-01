import React, { useState, useEffect } from 'react';
import './Practice.less';
import Goback from '@/components/Goback/Goback';
import AdbIcon from '@material-ui/icons/Adb';
import Wenda from '@/components/Practice/Wenda';
import Biancheng from '@/components/Practice/Biancheng';
import Fill from '@/components/Practice/Fill';
import Danxuan from '@/components/Practice/Danxuan';
import Panduan from '@/components/Practice/Panduan';
import Duoxuan from '@/components/Practice/Duoxuan';
import { useLocation } from 'react-router-dom';
import { GetQuestionListApi } from '@/request/api';

// 手指触摸点
let startX = -1;

// 手指松开点
let endX = -1;

// 当前li的索引值
let liIndex = 0;

const Practice = () => {
  const location = useLocation();
  let obj = location.state;

  useEffect(() => {
    GetQuestionListApi(obj).then(res => {
      if (res.errCode === 0) {
        setQuestionArr(res.data);
      }
    });
  }, [obj]);

  const [questionArr, setQuestionArr] = useState([]);
  const [ulLeft, setUlLeft] = useState(0);

  // 手指触摸到屏幕，记录起始点
  const handleTouchStart = e => {
    startX = e.touches[0].clientX;
  };
  // 手指滑动
  const handleTouchMove = e => {
    endX = e.touches[0].clientX;
  };
  // 手指离开屏幕，记录终点
  const handleTouchEnd = () => {
    // 获取滑动范围
    if (startX > -1 && endX > -1) {
      let distance = Math.abs(startX - endX);
      if (distance > 50) {
        // 两个手指位置距离相差50px，视为要滑动
        if (startX > endX) {
          liIndex++;
          // index是不能超过数组长度的
          if (Math.abs(liIndex) >= questionArr.length - 1) {
            liIndex = questionArr.length - 1;
          }
        } else {
          liIndex--;
          if (liIndex <= 0) {
            liIndex = 0;
          }
        }
        setUlLeft(-100 * liIndex + '%');
        startX = -1;
        endX = -1;
      } else {
        return;
      }
    }
  };

  return (
    <div className="Practice">
      <div className="top">
        <AdbIcon />
        <div className="top_index">
          <b>{Math.abs(liIndex) + 1}</b>
          <span>/</span>
          <span>{questionArr.length}</span>
        </div>
      </div>
      <ul
        className="question"
        style={{ width: questionArr.length * 100 + '%', left: ulLeft }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {questionArr.map((item, index) => (
          <li className="question_li" key={index}>
            <Wenda question={item} actionCode={location.state.actionCode} />
            <Biancheng question={item} actionCode={location.state.actionCode} />
            <Fill question={item} actionCode={location.state.actionCode} />
            <Danxuan question={item} actionCode={location.state.actionCode} />
            <Panduan question={item} actionCode={location.state.actionCode} />
            <Duoxuan question={item} actionCode={location.state.actionCode} />
          </li>
        ))}
      </ul>
      <Goback />
    </div>
  );
};

export default Practice;
