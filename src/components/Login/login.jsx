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
import axios from 'axios';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {},
      value: 0,
      remember: true,
      enrollment: "",
      password: "",
      cpassword: "",
      loginStatus: false,
      token: ""
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

  setCookie = (c_name, value, expiredays) => {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + value + ";path=/" + ((expiredays ==null) ? "" : ";expires=" + exdate.toGMTString());
  }

  getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }

  componentWillMount() {
    let token = this.getCookie("token");
    if(!token) {
      console.log("some error that you shouldn't care");
      token = localStorage.getItem("token");
      const remember = localStorage.getItem("remember") == "true"
      if(token && remember) {
        this.authSuccess(token);
      }
    } else {
      this.authSuccess(token);;
    }
  }

  authSuccess = (token) => {
    const thiss = this;
    axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': token
        },
            url: '/api/getUser',
            mode: 'cors'
        })
        .then(function (response) {
          thiss.setState({data: response.data, loginStatus: true, token: token});
        })
        .catch(function (error) {
            //thiss.setState({ tokenExpired : true, isLoading: false })
            console.log("error");
        });
  }

  submit(e) {
    e.preventDefault();
    const thiss = this;
    const authSuccess = this.authSuccess;
    const payload = {
        enrollment: this.state.enrollment,
        password: this.state.password
    };

    axios({
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
            url: '/api/authenticate',
            mode: 'cors',
            data: JSON.stringify(payload)
        })
        .then(function (response) {
            if(!thiss.state.remember) {
              localStorage.setItem("remember",false);
              thiss.setCookie('token',response.data.token,1);
            } else {
              localStorage.setItem("remember",true);
              localStorage.setItem("token",response.data.token);
            }
            authSuccess(response.data.token);
        })
        .catch(function (error) {
            console.log("error");
        });
  }

  render() {
    if(this.state.loginStatus) {
      return (this.props.children && React.cloneElement(this.props.children, {data: this.state.data, token: this.state.token}));
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
                  <form onSubmit={(e) => {this.submit(e)}}>
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
                      onChange={(e)=>{this.handleTextChange(e)}}
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
                    <Button onClick={(e) => {this.submit(e)}} type="submit" raised color="primary" className={classnames('login-btn')}>
                      Login
                    </Button>
                  </form>
                }</div>
                <div style={{ padding: 20 }}>{
                  <form>
                    <TextField
                      name="enrollment"
                      label="Enrollment No."
                      onChange={(e)=>{this.handleTextChange(e)}}
                      margin="normal"
                      className={classnames('text-input')}
                      fullWidth
                    />
                    <br />
                    <TextField
                      name="password"
                      label="Password"
                      type="password"
                      onChange={(e)=>{this.handleTextChange(e)}}
                      margin="normal"
                      className={classnames('text-input')}
                      fullWidth
                    />
                    <br />
                    <TextField
                      name="password"
                      label="Confirm Password"
                      onChange={(e)=>{this.handleTextChange(e)}}
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
