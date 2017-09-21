import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route,browserHistory } from 'react-router';
import App from './components/App/app.jsx';
import Login from './components/Login/login.jsx';
import Statistics from './components/Statistics/statistics.jsx';
import Dashboard from './components/Dashboard/dashboard.jsx';
import NotFound from './components/NotFound/notfound.jsx';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route component={Login}>
      <Route path="/" component={App} >
        <IndexRoute component={Dashboard} />
        <Route path='/statistics' component={Statistics} />
        <Route path='*' component={NotFound} />
      </Route>
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
