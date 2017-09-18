import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route,browserHistory } from 'react-router';
import App from './components/App/app.jsx';
import Login from './components/Login/login.jsx';
import Statistics from './components/Statistics/statistics.jsx';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Login}>
      <IndexRoute component={App} />
      <Route path='statistics' component={Statistics} />
    </Route>
    {/* <Route component={Login}>
      <Route path="/" component={App}>
        <Route path="/statistics" component={Statistics} />
        <IndexRoute component={Dashboard} />
        <Route path="/report" component={Report} />
        <Route path="/profile" component={Profile} />
        <Route path="/signout" component={Signout} />
      </Route>
    </Route> */}
    {/* <Route path="/reset/:enrollment/:token" component={Reset} />
    <Route path="*" component={NotFound} /> */}
  </Router>
  ,document.getElementById('root')
)
