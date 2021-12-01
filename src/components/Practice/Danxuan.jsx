import React, { useState } from 'react';
import { SubmitApi } from '@/request/api';
import { alertMapDispatchToProps, showHideAlert } from '@/utils';
import { connect } from 'react-redux';

const Danxuan = props => {
  let question = props.question;
  let myArr = JSON.parse(question.optionContent || '[]');

  const [option, setOption] = useState('');
  const [ifShowAnswer, setIfShowAnswer] = useState(false);

  // 提交答题内容
  const submitFn = (id, categoryCode) => {
    SubmitApi({
      categoryCode,
      actionType: 'exam_test',
      userAnswer: option,
      actionCode: props.actionCode,
      id
    }).then(res => {
      if (res.errCode === 0) {
        // 给出提示，提交成功
        showHideAlert(props, 'success', '提交成功');
        // 显示答案
        setIfShowAnswer(true);
      }
    });
  };

  return (
    <div
      className="danxuan"
      style={{ display: question.questionType === 'one' ? 'block' : 'none' }}
    >
      <div className="question_title">
        <span>单选</span>
        <p>{question.title}</p>
      </div>
      {/* <div dangerouslySetInnerHTML={<p></p>}></div> */}
      <ul className="question_options">
        {myArr.map((item, index) => (
          <li key={index} onClick={() => setOption(item.key)}>
            <i
              className={
                option === item.key ? 'iconfont icon-danxuanxiangxuanzhong' : 'iconfont icon-normal'
              }
            ></i>
            <span style={{ lineHeight: '25px' }}>
              {item.key}.{item.value}
            </span>
          </li>
        ))}
      </ul>
      <p className="question_tips">此类型的题目暂不支持打分，按正确计分。</p>
      <div className="question_submit" onClick={() => submitFn(question.id, question.categoryCode)}>
        确认
      </div>
      <section style={{ display: ifShowAnswer ? 'block' : 'none' }}>
        <div className="question_answer">
          <span>答案：</span>
          <p>{question.answer}</p>
        </div>
        <div className="question_answer question_analysis">
          <span>解析：</span>
          <p>{question.analysis}</p>
        </div>
      </section>
    </div>
  );
};

export default connect(null, alertMapDispatchToProps)(Danxuan);
