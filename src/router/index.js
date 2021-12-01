/* 
    BrowserRouter 是在开发过程中使用的，目的是为了去除 url 上的 #
    HashRouter 一般部署到线上时需要切换为 HashRouter ，这个HashRouter是 url 上携带 #
*/
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '@/App';
import Home from '@/views/Home/Home';
import Fast from '@/views/Fast/Fast';
import User from '@/views/User/User';
import Login from '@/views/Login/Login';
import Register from '@/views/Register/Register';
import Choose from '@/views/Choose/Choose';
import Practice from '@/views/Practice/Practice';

const BaseRouter = () => {
  return (
    <Router>
      {/* <Switch>
        <Route
          path="/"
          component={() => (
            <App>
              <Switch>
                <Route exact path="/home" component={Home}></Route>
                <Route exact path="/fast" component={Fast}></Route>
                <Route exact path="/user" component={User}></Route>
              </Switch>
            </App>
          )}
        ></Route>
      </Switch> */}
      <Routes>
        {/* <Route
          path="/"
          component={() => ( */}
        {/* <App> */}
        {/* <Routes> */}
        {/* <Route exact path="/" element={<App />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/fast" element={<Fast />} />
        <Route exact path="/user" element={<User />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} /> */}
        <Route path="/" element={<App />}>
          <Route path="/home" element={<Home />} />
          <Route path="/fast" element={<Fast />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/choose/:code" element={<Choose />} />
          <Route path="/practice" element={<Practice />} />
        </Route>
        {/* </Routes> */}
        {/* </App> */}
        {/* )}
        ></Route> */}
      </Routes>
    </Router>
  );
};

export default BaseRouter;
