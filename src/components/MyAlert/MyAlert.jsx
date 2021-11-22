import React from 'react';
import Alert from '@material-ui/lab/Alert';
import './MyAlert.less';
import { connect } from 'react-redux';

/* 
    error: 红色
    warning: 黄色
    info: 蓝色
    success: 绿色
*/

const MyAlert = props => {
  const { showAlert, alertType, alertContent } = props;
  return (
    <Alert style={{ display: showAlert ? 'flex' : 'none' }} variant="filled" severity={alertType}>
      {alertContent}
    </Alert>
  );
};

const mapStateToProps = state => {
  return {
    showAlert: state.showAlert,
    alertType: state.alertType,
    alertContent: state.alertContent
  };
};

export default connect(mapStateToProps, null)(MyAlert);
