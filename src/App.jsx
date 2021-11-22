import React, { useEffect } from 'react';
// import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.less';
import MyAlert from './components/MyAlert/MyAlert';
// import { alertMapDispatchToProps, showHideAlert } from './utils';
// import { alertMapDispatchToProps } from '@/utils';

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <MyAlert />
//         {this.props.children}
//         <button onClick={this.handleClick}>控制alert</button>
//       </div>
//     );
//   }

//   handleClick = () => {
//     this.props.showAlertFn({
//       showAlert: true,
//       alertType: 'success',
//       alertContent: 'Hello World'
//     });
//     setTimeout(() => {
//       this.props.hideAlertFn();
//     }, 2000);
//   };

//   componentDidMount() {
//     const history = useHistory();
//     console.log(this.props);
//     // if (this.props.location.pathname === '/') {
//     //   this.props.history.replace('/home');
//     // }
//   }
// }

const App = props => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/home');
    }
  });

  return (
    <div>
      <MyAlert />
      {props.children}
    </div>
  );
};

// export default connect(null, alertMapDispatchToProps)(App);
export default App;
