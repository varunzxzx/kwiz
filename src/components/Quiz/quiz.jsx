import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import classnames from 'classnames';
import PrevIcon from 'material-ui-icons/keyboardArrowLeft';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: this.props.questions,
      disableNext: false,
      disablePrev: true,
      value: 0
    }
  }

  nextSlide = () => {
    let value = this.state.value;
    if(value>1) {
      this.setState({disableNext: true})
    } else {
      value += 1;
    }
    this.setState({value})
  }

  prevSlide = () => {
    let value = this.state.value;
    if(value == 0) {
      this.setState({disableNext: true})
    } else {
      value -= 1;
    }
    this.setState({value})
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
        <div id="nextbtn">
          <PrevIcon />
        </div>
        <SwipeableViews value={this.state.value} enableMouseEvents className={classnames('question-card')}>
            {this.state.questions.map((value, index) => {
              return(
                <div key={value.op1} style={Object.assign({}, styles.slide)}>
                  <div className="ques">
                    {`Q${index+1}.  ${value.question}`}
                  </div>
                    <div className={classnames('op1')}>
                        {`A.  ${value.op1}`}
                    </div>
                    <div className={classnames('op2')}>
                        {`B.  ${value.op2}`}
                    </div>
                    <div className={classnames('op3')}>
                        {`C.  ${value.op3}`}
                    </div>
                    <div className={classnames('op4')}>
                        {`D.  ${value.op4}`}
                    </div>
                </div>
              )
            })}
        </SwipeableViews>
      </div>
    )
  }
}

export default Quiz;
