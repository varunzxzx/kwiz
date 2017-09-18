import React, { Component } from 'react';
import 'typeface-roboto';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import classnames from 'classnames';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      change: false,
      value: 0,
      remember: true,
      enrollment: "",
      password: "",
      cpassword: ""
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleTextChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  render() {
    if(this.state.change) {
      return (this.props.children && React.cloneElement(this.props.children, {data: this.state.changes}))
    } else {
      return(
        <div className="main-login">
          <div className="welcome">
            <img src="uploads/logo.PNG" alt="KWIZ logo" title="KWIZ logo"></img>
            <p>WELCOME TO</p>
            <h1>KWIZ</h1>
            <div className="login-form">
              <AppBar position="static" color="default">
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  fullWidth
                >
                  <Tab label="Login" />
                  <Tab label="Register" />
                </Tabs>
              </AppBar>
              <SwipeableViews style={{backgroundColor: 'white'}} index={this.state.value} onChangeIndex={this.handleChangeIndex}>
                <div style={{ padding: 20 }}>{
                  <form onSubmit={(e) => {e.preventDefault();console.log(this.state.enrollment)}}>
                    <TextField
                      name="enrollment"
                      label="Enrollment No."
                      margin="normal"
                      onChange={(e)=>{this.handleTextChange(e)}}
                      className={classnames('text-input')}
                      fullWidth
                    />
                    <br />
                    <TextField
                      name="password"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      margin="normal"
                      className={classnames('text-input')}
                      fullWidth
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.remember}
                          onChange={() => {this.setState({remember: !this.state.remember})}}
                          value="Remember"
                        />
                      }
                      label="Remember me"
                      className={classnames('remember')}
                    />
                    <Button type="submit" raised color="primary" className={classnames('login-btn')}>
                      Login
                    </Button>
                  </form>
                }</div>
                <div style={{ padding: 20 }}>{
                  <form>
                    <TextField
                      name="enrollment"
                      label="Enrollment No."
                      margin="normal"
                      className={classnames('text-input')}
                      fullWidth
                    />
                    <br />
                    <TextField
                      name="password"
                      label="Password"
                      type="password"
                      margin="normal"
                      className={classnames('text-input')}
                      fullWidth
                    />
                    <br />
                    <TextField
                      name="password"
                      label="Confirm Password"
                      type="password"
                      margin="normal"
                      className={classnames('text-input')}
                      fullWidth
                    />
                    <Button raised color="primary" className={classnames('login-btn')}>
                      REGISTER
                    </Button>
                  </form>
                }</div>
              </SwipeableViews>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Login;
