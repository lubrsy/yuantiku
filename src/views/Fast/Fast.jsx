import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import subject from '@/assets/images/home/subject.png';
import './Fast.less';
import { FastAnswerApi } from '@/request/api';
import { alertMapDispatchToProps, showHideAlert } from '@/utils';

const Fast = props => {
  const [fastArr, setFastArr] = useState([]);

  useEffect(() => {
    FastAnswerApi().then(res => {
      if (res.errCode === 0) {
        setFastArr(res.data.records);
        // console.log(res);
      }
    });
  }, []);

  return (
    <div className="fast" style={{ paddingBottom: '56px' }}>
      <ul>
        {fastArr.map(item => (
          <li key={item.id}>
            <img src={subject} alt="" />
            <h3>{item.title}</h3>
            <div
              onClick={() => showHideAlert(props, 'warning', '功能未开放！请前往首页学科题库！')}
            >
              刷题
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default connect(null, alertMapDispatchToProps)(Fast);
