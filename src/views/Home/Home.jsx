import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Home.less';
import Loading from '@/components/Loading/Loading';
import List from '@/components/Home/List/List';
import xiaolang from '@/assets/images/home/xiaolang.png';
import books from '@/assets/images/home/books.png';
import examination from '@/assets/images/home/examination.png';
import practice from '@/assets/images/home/practice.png';
import { HomeDefaultApi } from '@/request/api';
import { alertMapDispatchToProps, showHideAlert } from '@/utils';

const Home = props => {
  const [showLoading, setShowLoading] = useState(false);

  const [exam, setExam] = useState({});
  // 学科题库列表
  const [exemItems, setExemItems] = useState([]);
  // 收藏题目
  const [collect, setCollect] = useState('');
  // 错题集
  const [wrong, setWrong] = useState('');
  // 已学
  const [study, setStudy] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem('x-auth-token');
    if (token) {
      // 做请求
      HomeDefaultApi()
        .then(res => {
          // console.log(res);
          if (res.errCode === 0) {
            let { exam, exemItems, collect, wrong, study } = res.data;
            setExam(exam);
            setExemItems(exemItems);
            setCollect(collect);
            setWrong(wrong);
            setStudy(study);
          } else {
            showHideAlert(props, 'error', res.message);
          }
        })
        .catch(err => {
          // console.log(err.response.data.errCode)
          if (err.response.data.errCode === 1002) {
            // 显示loading
            setShowLoading(true);

            // 跳转到登录页
            setTimeout(() => {
              navigate('/login');
            }, 1500);
          }
        });
    } else {
      // 显示loading
      setShowLoading(true);

      // 跳转到登录页 Login
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  }, [props, navigate]);

  return (
    <div className="home" style={{ paddingBottom: '56px' }}>
      <div className="title">
        <div className="subject">{exam.title}</div>
        {/* <div className="testSubject">切换考试科目</div> */}
      </div>
      <div className="studyKu">
        <p className="welcome">欢迎使用IT猿题库！</p>
        <div className="down">
          <img src={xiaolang} alt="" />
          <div className="right">
            <div className="top">
              <span>已学{study}题</span>
              <span>|</span>
              <span>共{exam.itemCount}题</span>
            </div>
            <div className="down">
              <div className="err">
                <div>{wrong}</div>
                <div>错题</div>
              </div>
              <div className="shoucang">
                <div>{collect}</div>
                <div>收藏</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="category">
        <img
          src={examination}
          alt=""
          onClick={() => showHideAlert(props, 'warning', '功能未开放！请在学科题库练习！')}
        />
        <img
          src={books}
          alt=""
          onClick={() => showHideAlert(props, 'warning', '功能未开放！请在学科题库练习！')}
        />
        <img
          src={practice}
          alt=""
          onClick={() => showHideAlert(props, 'warning', '功能未开放！请在学科题库练习！')}
        />
      </div>
      <div className="tiku">
        <h3 className="subject_title">学科题库</h3>
        <span>坚持每一天，成长看得见</span>
      </div>
      <List listArr={exemItems} />
      <Loading showLoading={showLoading} />
    </div>
  );
};

export default connect(null, alertMapDispatchToProps)(Home);
