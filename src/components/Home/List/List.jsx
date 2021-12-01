import React from 'react';
import './List.less';
import subject from '@/assets/images/home/subject.png';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useNavigate } from 'react-router-dom';

const List = props => {
  const navigate = useNavigate();

  const goChoosePage = code => {
    navigate('/choose/' + code);
  };

  return (
    <ul className="list">
      {props.listArr.map(item => (
        <li key={item.id}>
          <img src={subject} alt="" />
          {/* <div className="ellipsis"> */}
          <section>
            <div className="list_title" style={{ lineHeight: '30px' }}>
              {item.title}
            </div>
            <div className="list_desc">
              {item.itemCount}/{item.itemCount}题
            </div>
            <LinearProgress variant="determinate" value={100} />
          </section>
          {/* </div> */}
          <div className="btn" onClick={() => goChoosePage(item.actionCode)}>
            练习
          </div>
        </li>
      ))}
    </ul>
  );
};

export default List;
