import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import classnames from 'classnames';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import axios from 'axios';
import { CircularProgress } from 'material-ui/Progress';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

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
      token: "",
      loading: false,
      isRegistered: false,
      email : "",
      otp: "",
      registerSuccess: false,
      name: ""
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleDialogChange = (e,v) => {
    this.setState({method: e.target.value})
  }

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

  handleRegister = (e) => {
    e.preventDefault();
    if(this.state.password != this.state.cpassword) {

    } else {
      this.setState({loading: true});
      const payload = {
          enrollment: this.state.enrollment
      };
      const thiss = this;
      axios({
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
              url: '/api/authregister',
              mode: 'cors',
              data: JSON.stringify(payload)
          })
          .then(function (response) {
              thiss.setState({isRegistered: true, email: response.data.email, loading: false});
          })
          .catch(function (error) {
            thiss.setState({loading: false})
              console.log("error");
          });
    }
  }

  componentWillMount() {
    let token = this.getCookie("token");
    if(!token) {
      this.setState({loading: true});
      console.log("some error that you shouldn't care");
      token = localStorage.getItem("token");
      const remember = localStorage.getItem("remember") == "true"
      if(token && remember) {
        this.authSuccess(token);
      } else {
        this.setState({loading: false});
      }
    } else {
      this.setState({loading: true});
      this.authSuccess(token);
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
          thiss.setState({data: response.data, loginStatus: true, token: token,loading: false});
        })
        .catch(function (error) {
            //thiss.setState({ tokenExpired : true, isLoading: false })
            thiss.setState({loading: false});
            console.log("error");
        });
  }

  submit(e) {
    e.preventDefault();
    this.setState({loading: true});
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
            thiss.setState({loading: false});
            console.log("error");
        });
  }

  handleRequestClose = () => {
    this.setState({ isRegistered: false, registerSuccess: false});
  };

  handleRegistration = () => {
    const thiss = this;
    this.setState({isRegistered: false, loading: true})
      const payload = {
          enrollment: this.state.enrollment,
          password: this.state.password,
          token: this.state.otp
      };
      axios({
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
              url: '/api/register',
              mode: 'cors',
              data: JSON.stringify(payload)
          })
          .then(function (response) {
            console.log(response.data)
              thiss.setState({registerSuccess: true, loading: false, name: response.data.name})
          })
          .catch(function (error) {
              thiss.setState({loading: false});
          });
  }

  render() {
    if(this.state.loginStatus) {
      return (this.props.children && React.cloneElement(this.props.children, {data: this.state.data, token: this.state.token}));
    } else {
      return(
        <div className="main-login">
        {this.state.loading && <div className={classnames('loading')}><CircularProgress size={80} /></div>}
        {!this.state.loading &&
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
                  <form onSubmit={(e) => {this.handleRegister(e)}}>
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
                      name="cpassword"
                      label="Confirm Password"
                      onChange={(e)=>{this.handleTextChange(e)}}
                      type="password"
                      margin="normal"
                      className={classnames('text-input')}
                      fullWidth
                    />
                    <Button onClick={this.handleRegister} raised color="primary" className={classnames('login-btn')}>
                      REGISTER
                    </Button>
                  </form>
                }</div>
              </SwipeableViews>
              <Dialog open={this.state.isRegistered} transition={Slide} onRequestClose={this.handleRequestClose}>
                <DialogTitle>{"OTP Sent"}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    A one time password has been sent to  {this.state.email}
                    <input style={{width: "60%",marginTop: "20px",marginLeft: "50px"}} type="text" placeholder="Enter OTP here" onChange={(e) => {this.setState({otp: e.target.value})}}/>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  {this.state.otp != "" && <Button onClick={() => {this.handleRegistration()}} color="primary" raised>
                    SUBMIT
                  </Button>}
                </DialogActions>
              </Dialog>
              <Dialog open={this.state.registerSuccess} transition={Slide} onRequestClose={this.handleRequestClose}>
                <DialogTitle>{"Successfully Registered"}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Hey {this.state.name}, You have successfuly registered to KWIZ - Online Quiz Portal. Enjoy
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => {this.setState({value: 0});this.handleRequestClose()}} color="primary" raised>
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        }
        </div>
      )
    }
  }
}

export default Login;
