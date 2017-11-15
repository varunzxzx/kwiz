import React, { Component } from 'react';
import Topics from './Topics/topics.jsx';
import Quiz from '../Quiz/quiz.jsx';
import axios from 'axios';
import classnames from 'classnames';
import { CircularProgress } from 'material-ui/Progress';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ReplayIcon from 'material-ui-icons/Replay';
import ArrowIcon from 'material-ui-icons/ArrowBack';
import { browserHistory } from 'react-router';
import Responsive from 'react-responsive';

const Desktop = ({ children }) => <Responsive minWidth={768} children={children} />;
const Mobile = ({ children }) => <Responsive maxWidth={767} children={children} />;

class Practice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      total: 0,
      loading: false,
      type: "",
      result: "irf"
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
    this.setState({type: str});
    this.getQuestions(str);
  }

  handleAnswers = (answers) => {
    this.setState({loading: true});
    const payload = {
        answers: answers,
        type: this.state.type,
        token: this.props.token,
        limit: 20
    };

    const thiss = this;

    axios({
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
            url: '/api/submitAnswer',
            mode: 'cors',
            data: JSON.stringify(payload)
        })
        .then(function (response) {
          console.log(response.data);
            thiss.setState({result: response.data, questions: [],loading: false});
        })
        .catch(function (error) {
            console.log("error");
            this.setState({loading: false});
        });
  }

  getQuestions = (str) => {
    this.setState({loading: true})
    const thiss = this;
    axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': this.props.token,
            'x-access-type': str,
            'x-access-limit': 20
        },
            url: '/api/getQuestion',
            mode: 'cors'
        })
        .then(function (response) {
          console.log(response.data);
          thiss.setState({questions: response.data,loading: false, total: response.data.length * 10});
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
        <Desktop>
          {this.state.loading && <div><div className={classnames('loading m')}><CircularProgress size={80} /></div></div>}
          {!this.state.loading && this.state.result == "irf" && this.state.questions.length == 0 && <Topics submit={this.handleSubmit} />}
          {!this.state.loading && this.state.questions.length != 0 && <Quiz questions={this.state.questions} handleAnswers={this.handleAnswers} />}
          {!this.state.loading && this.state.result != "irf" && <div>
            <Card className={classnames('score-card')} raised>
              <CardContent>
                <img src="/uploads/ribbons.png" alt="trophy" width={200}/>
                <Typography type="display1" gutterBottom>
                  You scored
                </Typography>
                <Typography type="display3" gutterBottom>
                  {`${this.state.result * 10} / ${this.state.total}`}
                </Typography>
                <Button raised color="primary" onClick={() => {location.reload()}}>
                <ReplayIcon/>&nbsp;&nbsp;Play Again
                </Button>
                <Button raised color="accent" onClick={() => {browserHistory.push('/');location.reload()}}>
                  <ArrowIcon/>&nbsp;&nbsp;Go Back
                </Button>
              </CardContent>
            </Card>
          </div>}
        </Desktop>
        <Mobile>
          <div className="dash">
            <h3>Oops! This feature is not available for mobile device yet. We're working hard on this.</h3>
          </div>
        </Mobile>
      </div>
    )
  }
}

export default Practice;
