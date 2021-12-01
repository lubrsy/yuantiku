import React, { useState } from 'react';
import { SubmitApi } from '@/request/api';
import { alertMapDispatchToProps, showHideAlert } from '@/utils';
import { connect } from 'react-redux';

const Duoxuan = props => {
  let question = props.question;
  let myArr = JSON.parse(question.optionContent || '[]');

  const [option, setOption] = useState([]);
  const [ifShowAnswer, setIfShowAnswer] = useState(false);

  // 选项点击事件
  const optionClick = key => {
    let myOption = JSON.parse(JSON.stringify(option));
    // 先判断点击项是否已在数组中
    if (myOption.includes(key)) {
      // 删除
      let index = myOption.indexOf(key);
      myOption.splice(index, 1);
    } else {
      // 追加一项
      myOption.push(key);
    }
    setOption(myOption);
  };

  // 提交答题内容
  const submitFn = (id, categoryCode) => {
    let str = option.join();
    SubmitApi({
      categoryCode,
      actionType: 'exam_test',
      userAnswer: str,
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
      className="duoxuan"
      style={{ display: question.questionType === 'many' ? 'block' : 'none' }}
    >
      <div className="question_title">
        <span>多选</span>
        <p>{question.title}</p>
      </div>
      {/* <div dangerouslySetInnerHTML={<p></p>}></div> */}
      <ul className="question_options">
        {myArr.map((item, index) => (
          <li key={index} onClick={() => optionClick(item.key)}>
            <i
              className={
                option.includes(item.key)
                  ? 'iconfont icon-danxuanxiangxuanzhong'
                  : 'iconfont icon-normal'
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

export default connect(null, alertMapDispatchToProps)(Duoxuan);
