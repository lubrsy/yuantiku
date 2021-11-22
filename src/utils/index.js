// 这个文件专门用来抽离各种公共函数

// 专门用来处理 Alert 组件的 dispatchToProps
export const alertMapDispatchToProps = dispatch => {
  return {
    showAlertFn(value) {
      dispatch({
        type: 'showAlert',
        value
      });
    },
    hideAlertFn() {
      dispatch({
        type: 'hideAlert'
      });
    }
  };
};

export const showHideAlert = (props, obj) => {
  props.showAlertFn(obj);
  setTimeout(() => {
    props.hideAlertFn();
  }, 2000);
};

// 简洁版
// export const showHideAlert = (props, alertType, alertContent) => {
//   props.showAlertFn({
//     showAlert: true,
//     alertType: alertType,
//     alertContent: alertContent
//   });
//   setTimeout(() => {
//     props.hideAlertFn();
//   }, 2000);
// };
