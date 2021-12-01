import React, { useState } from 'react';
import { SubmitApi } from '@/request/api';
import { alertMapDispatchToProps, showHideAlert } from '@/utils';
import { connect } from 'react-redux';

const Wenda = props => {
  let question = props.question;

  const [ifShowAnswer, setIfShowAnswer] = useState(false);
  const [answer, setAnswer] = useState('');

  // 提交答题内容
  const submitFn = (id, categoryCode) => {
    SubmitApi({
      categoryCode,
      actionType: 'exam_test',
      userAnswer: answer,
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
    <div className="wenda" style={{ display: question.questionType === 'qa' ? 'block' : 'none' }}>
      <div className="question_title">
        <span>问答</span>
        <p>{question.title}</p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: question.content || '<div></div>' }}></div>
      <textarea
        className="question_textarea"
        placeholder="请输入内容"
        value={answer}
        onChange={e => setAnswer(e.target.value)}
      ></textarea>
      <p className="question_tips">此类型的题目暂不支持打分，按正确计分。</p>
      <div className="question_submit" onClick={() => submitFn(question.id, question.categoryCode)}>
        确认
      </div>
      <section style={{ display: ifShowAnswer ? 'block' : 'none' }}>
        <div className="question_answer">
          <span>答案：</span>
          <p dangerouslySetInnerHTML={{ __html: question.answer || '<div></div>' }}></p>
        </div>
        <div className="question_answer question_analysis">
          <span>解析：</span>
          <p>{question.analysis}</p>
        </div>
      </section>
    </div>
  );
};

export default connect(null, alertMapDispatchToProps)(Wenda);
