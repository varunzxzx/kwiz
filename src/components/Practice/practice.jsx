import React, { Component } from 'react';
import Topics from './Topics/topics.jsx';
import axios from 'axios';
import classnames from 'classnames';

class Practice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
  }

  handleSubmit = (e) => {
    let arr;
    let str = "";
    let flag = false;
    arr = e.toLowerCase().split(" ");
    arr.map(value => {
      if(value != "&") {
        if(flag) {
          value = value.charAt(0).toUpperCase() + value.slice(1);
          str += value;
        } else {
          flag = true;
          str += value;
        }
      }
    });
    this.getQuestions(str);
  }

  getQuestions = (str) => {
    const thiss = this;
    axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': this.props.token,
            'x-access-type': str
        },
            url: '/api/getQuestion',
            mode: 'cors'
        })
        .then(function (response) {
          thiss.setState({questions: response.data});
          console.log(response.data);
        })
        .catch(function (error) {
            //thiss.setState({ tokenExpired : true, isLoading: false })
            console.log("error");
        });
  }

  render() {
    return(
      <div className={classnames('practice')}>
        <Topics submit={this.handleSubmit}/>
      </div>
    )
  }
}

export default Practice;
