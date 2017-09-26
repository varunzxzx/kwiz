import React, { Component } from 'react';
import Topics from './Topics/topics.jsx';
import Quiz from '../Quiz/quiz.jsx';
import axios from 'axios';
import classnames from 'classnames';
import { CircularProgress } from 'material-ui/Progress';

class Practice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      loading: false
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

  handleAnswers = (answers) => {
    console.log(answers);
  }

  componentDidMount() {
    this.getQuestions('basics');
  }

  getQuestions = (str) => {
    this.setState({loading: true})
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
          thiss.setState({questions: response.data,loading: false});
        })
        .catch(function (error) {
            //thiss.setState({ tokenExpired : true, isLoading: false })
            thiss.setState({loading: false});
            console.log("error");
        });
  }

  render() {
    return(
      <div className={classnames('practice')}>
        {this.state.loading && <div><div className={classnames('loading m')}><CircularProgress size={80} /></div></div>}
        {false && !this.state.loading && this.state.questions.length == 0 && <Topics submit={this.handleSubmit} />}
        {this.state.questions.length != 0 && <Quiz questions={this.state.questions} handleAnswers={this.handleAnswers} />}
      </div>
    )
  }
}

export default Practice;
