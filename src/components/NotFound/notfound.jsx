import React,{ Component } from 'react';
import { browserHistory } from 'react-router';

class NotFound extends Component {
  componentWillMount() {
    browserHistory.push('/')
  }
  render() {
    return null;
  }
}

export default NotFound;
