import request from './request';

// 首页默认数据
export const HomeDefaultApi = () => request.get('/6666');

// 登录接口
export const LoginApi = params => request.post('/1024/login', params);

// 注册接口
export const RegisterApi = params => request.post('/1024/register', params);
