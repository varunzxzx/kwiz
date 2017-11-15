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
import Snackbar from 'material-ui/Snackbar';
import Responsive from 'react-responsive';

const Desktop = ({ children }) => <Responsive minWidth={768} children={children} />;
const Mobile = ({ children }) => <Responsive maxWidth={767} children={children} />;

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
      loginStatus: false,
      token: "",
      loading: false,
      isRegistered: false,
      email : "",
      otp: "",
      registerSuccess: false,
      open: false,
      willRegister: false,
      name: "",
      phone: "",
      password: "",
      cpassword: "",
      passMatch: true
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

  handleRegister = (e) => {
    e.preventDefault();
      this.setState({loading: true});
      const payload = {
          enrollment: this.state.enrollment,
          email: this.state.email
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
              thiss.setState({willRegister: true, loading: false});
          })
          .catch(function (error) {
            thiss.setState({loading: false})
              console.log("error");
          });
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
            thiss.setState({loading: false,open: true});
            console.log("error");
        });
  }

  handleRequestClose = () => {
    this.setState({willRegister: false, isRegistered: false, registerSuccess: false});
  };

  handleRegistration = () => {
    const thiss = this;
    this.setState({isRegistered: false, loading: true});
    const payload = {
        enrollment: this.state.enrollment,
        password: this.state.password,
        email: this.state.email,
        phone: this.state.phone,
        name: this.state.name,
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

  sendMail = () => {
    const thiss = this;
    if(this.state.password !== this.state.cpassword) {
      this.setState({passMatch: false});
    } else {
      this.setState({willRegister: false, loading: true});
      const payload = {
          email: this.state.email,
          enrollment: this.state.enrollment
      };
      axios({
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
              url: '/api/sendMail',
              mode: 'cors',
              data: JSON.stringify(payload)
          })
          .then(function (response) {
            console.log(response.data)
              thiss.setState({isRegistered: true, loading: false})
          })
          .catch(function (error) {
              thiss.setState({loading: false});
          });
    }
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
                      name="email"
                      label="Email"
                      onChange={(e)=>{this.handleTextChange(e)}}
                      margin="normal"
                      className={classnames('text-input')}
                      fullWidth
                    />
                    <br />
                    <br />
                    <Button onClick={this.handleRegister} type="submit" raised color="primary" className={classnames('login-btn')}>
                      REGISTER
                    </Button>
                  </form>
                }</div>
              </SwipeableViews>
              <Dialog open={this.state.willRegister} transition={Slide} onRequestClose={this.handleRequestClose}>
                <DialogTitle>{"Registration"}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <form style={{display: 'flex',flexWrap: 'wrap'}}>
                      <Desktop>
                        <TextField
                          name="name"
                          label="Name"
                          style={{width: "200px"}}
                          value={this.state.name}
                          onChange={(e)=>{this.handleTextChange(e)}}
                          margin="normal"
                        />
                        <TextField
                          name="phone"
                          label="Mobile No."
                          style={{width: "200px", marginLeft: "40px"}}
                          value={this.state.phone}
                          onChange={(e)=>{this.handleTextChange(e)}}
                          margin="normal"
                        />
                        <TextField
                          name="password"
                          label="Password"
                          type="password"
                          style={{width: "200px"}}
                          value={this.state.password}
                          onChange={(e)=>{this.handleTextChange(e)}}
                          margin="normal"
                        />
                        <TextField
                          name="cpassword"
                          label="Confirm Password"
                          type="password"
                          style={{width: "200px", marginLeft: "40px"}}
                          value={this.state.cpassword}
                          onChange={(e)=>{this.handleTextChange(e)}}
                          margin="normal"
                        />
                      </Desktop>
                      <Mobile>
                        <TextField
                          name="name"
                          label="Name"
                          style={{width: "200px"}}
                          value={this.state.name}
                          onChange={(e)=>{this.handleTextChange(e)}}
                          margin="normal"
                        />
                        <TextField
                          name="phone"
                          label="Mobile No."
                          style={{width: "200px"}}
                          value={this.state.phone}
                          onChange={(e)=>{this.handleTextChange(e)}}
                          margin="normal"
                        />
                        <TextField
                          name="password"
                          label="Password"
                          type="password"
                          style={{width: "200px"}}
                          value={this.state.password}
                          onChange={(e)=>{this.handleTextChange(e)}}
                          margin="normal"
                        />
                        <TextField
                          name="cpassword"
                          label="Confirm Password"
                          type="password"
                          style={{width: "200px"}}
                          value={this.state.cpassword}
                          onChange={(e)=>{this.handleTextChange(e)}}
                          margin="normal"
                        />
                      </Mobile>
                    </form>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => {this.sendMail()}} color="primary" raised>
                    SUBMIT
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog open={this.state.isRegistered} transition={Slide} onRequestClose={this.handleRequestClose}>
                <DialogTitle>{"OTP Sent"}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    A one time password has been sent to  <em>{this.state.email}</em>
                    <input style={{width: "60%",marginTop: "20px",marginLeft: "50px"}} type="text" placeholder="Enter OTP here" onChange={(e) => {this.setState({otp: e.target.value})}}/>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  {<Button onClick={() => {if(this.state.otp !== ""){this.handleRegistration()}}} color="primary" raised>
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
            <Snackbar
              anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
              open={this.state.open}
              onRequestClose={() => {this.setState({open: false})}}
              SnackbarContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">Wrong Credentials</span>}
            />
            <Snackbar
              anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
              open={!this.state.passMatch}
              onRequestClose={() => {this.setState({passMatch: true})}}
              SnackbarContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">Password doesn't match</span>}
            />
          </div>
        }
        </div>
      )
    }
  }
}

export default Login;
