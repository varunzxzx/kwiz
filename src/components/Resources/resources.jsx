import React, { Component } from 'react';
import classnames from 'classnames';
import {CircularProgress} from 'material-ui/Progress'
import Topics from '../Practice/Topics/topics.jsx';
import axios from 'axios';
import Card, { CardContent } from 'material-ui/Card';
import {FormGroup, FormControlLabel} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      questions: [],
      type: "",
      notFound: false,
      e: ""
    }
  }

  handleRequestClose = () => {
    this.setState({notFound: false});
  }

  handleSubmit = (e) => {
    this.setState({e})
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
    console.log(str);
    this.getQuestions(str);
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
            url: '/api/resources',
            mode: 'cors'
        })
        .then(function (response) {
          thiss.setState({questions: response.data, loading: false});
        })
        .catch(function (error) {
            thiss.setState({notFound: true,loading: false});
            console.log("error");
        });
  }

  render() {
    return(
      <div className="dash">
        {this.state.loading && <div><div className={classnames('loading m')}><CircularProgress size={80} /></div></div>}
        {!this.state.loading && this.state.questions.length == 0 && <Topics submit={this.handleSubmit} />}
        {!this.state.loading && this.state.questions.length != 0 && <Card style={{width: "80%", margin: "auto"}}>
          <CardContent>
            {this.state.questions.map((question,i) => {
              return(
                <div style={{marginTop: "15px"}} key={i}>
                  Q{i+1}. {question.question}
                  <FormGroup style={{marginLeft: "24px"}}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={question.crct == "1"}
                          value={question.op1}
                        />
                      }
                      label={question.op1}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={question.crct == "2"}
                          value={question.op2}
                        />
                      }
                      label={question.op2}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={question.crct == "3"}
                          value={question.op3}
                        />
                      }
                      label={question.op3}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={question.crct == "4"}
                          value={question.op4}
                        />
                      }
                      label={question.op4}
                    />
                  </FormGroup>
                  <Divider />
                </div>
              )
            })}
          </CardContent>
        </Card>}
        <Dialog open={this.state.notFound} transition={Slide} onRequestClose={this.handleRequestClose}>
          <DialogTitle>{"Not Found"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              It seems you have not played any <em>{this.state.e}</em> quiz. It will unlock only when you play atleast one <em>{this.state.e}</em> quiz.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {this.handleRequestClose()}} color="primary" raised>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default Resources;
