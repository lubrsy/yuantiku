import React, { useState, useEffect } from 'react';
import Goback from '@/components/Goback/Goback';
import './Choose.less';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ChoosePageApi } from '@/request/api';
import { alertMapDispatchToProps, showHideAlert } from '@/utils';

const Choose = props => {
  // 全部 未做 已做
  const [testType] = useState('all');
  // 题目类型的数组
  const [questionArr, setQuestionArr] = useState([]);
  // 题目类型数组的当前项
  const [questionActive, setQuestionActive] = useState('all');
  // 当前学科数组
  const [testArr] = useState([
    { key: 'all', cn: '全部' },
    { key: 'err', cn: '错误' },
    { key: 'done', cn: '已做' },
    { key: 'notdone', cn: '没做' }
  ]);
  // 试题分类当前项
  const [testActive, setTestActive] = useState('all');
  // 试题数量
  const [numArr] = useState([5, 10, 20, 30, 50, 100]);
  // 试题数量当前项
  const [numActive, setNumActive] = useState(5);

  const navigate = useNavigate();
  const params = useParams();

  // 给出提示，该功能暂未开放
  const goToExam = () => {
    showHideAlert(props, 'warning', '该功能暂未开放');
  };

  const goToPracticePage = () => {
    navigate('/practice', {
      state: {
        testNum: numActive,
        testType: testActive,
        actionCode: params.code,
        questionType: questionActive
      }
    });
    // navigate('/practice');
  };

  useEffect(() => {
    let actionCode = params.code;

    ChoosePageApi({
      testType: testType,
      actionCode
    }).then(res => {
      if (res.errCode === 0) {
        let newArr = JSON.parse(JSON.stringify(res.data));
        newArr.forEach(item => {
          switch (item.key) {
            case 'all':
              item.cn = '全部';
              break;
            case 'qa':
              item.cn = '问答';
              break;
            case 'code':
              item.cn = '编程';
              break;
            case 'one':
              item.cn = '单选';
              break;
            case 'check':
              item.cn = '判断';
              break;
            case 'many':
              item.cn = '多选';
              break;
            case 'fill':
              item.cn = '填空';
              break;
            default:
              break;
          }
        });
        setQuestionArr(newArr);
      }
    });
  }, [params.code, testType]);

  return (
    <div className="choose">
      <div className="top_btns">
        <div className="top_btn1" onClick={goToPracticePage}>
          进入练习模式
        </div>
        <div className="top_btn2" onClick={goToExam}>
          进入考试模式
        </div>
      </div>
      <div className="mytitle">试题分类</div>
      <ul className="tabs">
        {testArr.map((item, index) => (
          <li
            key={index}
            className={testActive === item.key ? 'active' : ''}
            onClick={() => setTestActive(item.key)}
          >
            {item.cn}
          </li>
        ))}
      </ul>
      <div className="mytitle">题目类型</div>
      <ul className="tabs">
        {questionArr.map((item, index) => {
          return (
            <li
              key={index}
              className={questionActive === item.key ? 'active' : ''}
              onClick={() => setQuestionActive(item.key)}
            >
              {item.cn} ({item.value})
            </li>
          );
        })}
      </ul>

      <div className="mytitle">做题数量</div>
      <ul className="tabs">
        {numArr.map((item, index) => (
          <li
            key={index}
            className={numActive === item ? 'active' : ''}
            onClick={() => setNumActive(item)}
          >
            {item}
          </li>
        ))}
      </ul>

      <Goback />
    </div>
  );
};

export default connect(null, alertMapDispatchToProps)(Choose);
