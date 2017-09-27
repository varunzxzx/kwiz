import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import classnames from 'classnames';
import PrevIcon from 'material-ui-icons/keyboardArrowLeft';
import NextIcon from 'material-ui-icons/keyboardArrowRight';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl} from 'material-ui/Form';
import Select from 'material-ui/Select';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: this.props.questions,
      disableNext: false,
      disablePrev: true,
      value: 0,
      answers: [],
      active: [],
      n: 0,
      minute: 20,
      second: 0,
      milisecond: 0,
      interval: 9
    }
  }

  nextSlide = () => {
    let value = this.state.value;
    if(value>this.state.questions.length - 2) {
      this.setState({disableNext: true})
    } else {
      value += 1;
    }
    this.setState({value});
  }

  prevSlide = () => {
    let value = this.state.value;
    if(value == 0) {
      this.setState({disablePrev: true})
    } else {
      value -= 1;
    }
    this.setState({value})
  }

  handleOption = (index,n) => {
    this.state.answers[index] = n;
    let arr = this.state.active.slice();
    arr[index] = n;
    this.setState({active : arr});
    if(this.state.value<this.state.questions.length-1) {
      setTimeout(() => {
        this.setState({value: this.state.value + 1})
      },500);
    }
  }

  handleSubmit = () => {
    let i;
    for(i=0;i<this.state.questions.length;i++) {
      if(!this.state.answers[i]) {
        this.state.answers[i] = 0;
      }
    }
    this.props.handleAnswers(this.state.answers);
  }

  handleSelect = (e) => {
    this.setState({n: e.target.value, value: e.target.value});
  }

  handleExit = () => {
    console.log("Quiz ends");
    this.props.handleAnswers(this.state.answers);
    clearInterval(this.state.interval);
  }

  componentDidMount = () => {
    let interval = setInterval(() => {
      let minute = this.state.minute;
      let second = this.state.second;
      let milisecond = this.state.milisecond;
      if(minute == 0 && second == 1 && milisecond == 0) {
        this.handleExit();
      }
      if(second == 0) {
        minute -= 1;
        second = 60;
      }
      if(milisecond == 0) {
        second -= 1;
        milisecond = 10;
      }
      milisecond -= 1;
      this.setState({minute, second, milisecond});
    },100);
    this.setState({interval})
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    const styles = {
        slide: {
          padding: 15,
          minHeight: 100,
        },
      };
    return(
      <div className={classnames('quiz')}>
        <div id="timer">
          <div>{this.state.minute<10?'0' + this.state.minute:this.state.minute}</div><div>&nbsp;:&nbsp;</div><div>{this.state.second<10?'0' + this.state.second:this.state.second}</div><div>&nbsp;:&nbsp;</div><div>{this.state.milisecond<10? '0' + this.state.milisecond:this.state.milisecond}</div>
        </div>
        <Button id="nextbtn" onClick={() => {this.nextSlide()}}>
          <NextIcon />
        </Button>
        <Button id="prevbtn" onClick={() => {this.prevSlide()}}>
          <PrevIcon />
        </Button>
        <SwipeableViews  index={this.state.value} enableMouseEvents className={classnames('question-card')}>
            {this.state.questions.map((value, index) => {
              return(
                <div key={index} style={Object.assign({}, styles.slide)}>
                  <div className="ques">
                    {`Q${index+1}.\u00A0\u00A0${value.question}`}
                  </div>
                    <div id="set1" className={classnames('row')}>
                      <Button onClick={() => {this.handleOption(index,1)}} className={this.state.active[index] == 1? classnames('op1 col-md-5 col-xs-11 selected-option'):classnames('op1 col-md-5 col-xs-11')}>
                          {`A.\u00A0\u00A0\u00A0${value.op1}`}
                      </Button>
                      <Button onClick={() => {this.handleOption(index,2)}} className={this.state.active[index] == 2? classnames('op2 col-md-5 col-xs-11 selected-option'):classnames('op2 col-md-5 col-xs-11')}>
                          {`B.\u00A0\u00A0\u00A0${value.op2}`}
                      </Button>
                    </div>
                    <div id="set2" className={classnames('row')}>
                      <Button onClick={() => {this.handleOption(index,3)}} className={this.state.active[index] == 3? classnames('op3 col-md-5 col-xs-11 selected-option'):classnames('op3 col-md-5 col-xs-11')}>
                          {`C.\u00A0\u00A0\u00A0${value.op3}`}
                      </Button>
                      <Button onClick={() => {this.handleOption(index,4)}} className={this.state.active[index] == 4? classnames('op4 col-md-5 col-xs-11 selected-option'):classnames('op4 col-md-5 col-xs-11')}>
                          {`D.\u00A0\u00A0\u00A0${value.op4}`}
                      </Button>
                    </div>
                </div>
              )
            })}
        </SwipeableViews>
        <div className={classnames('quizbtn')}>
          <div id="select">
            <FormControl style={{minWidth: 250}}>
              <InputLabel htmlFor="age-simple">Jump To</InputLabel>
              <Select
                value={this.state.n}
                onChange={this.handleSelect}
                input={<Input id="age-simple" />}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 50 * 4.5 + 10,
                      width: 200,
                    },
                  },
                }}
              >
                {
                  this.state.questions.map((value,i) => {
                    return <MenuItem key={i} value={i}>{i+1}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </div>
          <Button color="primary" onClick={() => {this.handleSubmit()}}>
            FINISH
          </Button>
          <Button color="primary" onClick={() => {this.handleExit()}}>
            EXIT
          </Button>
        </div>
      </div>
    )
  }
}

export default Quiz;
