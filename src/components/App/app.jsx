import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import NotificationIcon from 'material-ui-icons/Notifications';
import PowerIcon from 'material-ui-icons/PowerSettingsNew';
import Badge from 'material-ui/Badge';
import { withStyles } from 'material-ui/styles';
import Drawer from '../Drawer/drawer.jsx';
import classnames from 'classnames';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import Notifications from './Notifications/Notifications.jsx';
import axios from 'axios';
import FeedbackIcon from 'material-ui-icons/Feedback';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import Feedback from './Feedback/feedback.jsx';

const styles = theme => ({
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class ButtonAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      component: "Dashboard",
      raw: "",
      openNotification: false,
      notifications: [],
      n: 0,
      feedback: false,
      feedbackSubmit: false
    }
  }

  readNotification = (id) => {
    const thiss = this;
    const payload = {
      id: id,
      token: this.props.token
    }
    axios({
      method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
            url: '/api/readNotification',
            mode: 'cors',
            data: JSON.stringify(payload)
        })
        .then(function (response) {
          thiss.setState({n: thiss.state.n - 1});
        })
        .catch(function (error) {
        });
  }

  componentWillMount() {
    const thiss = this;
    axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': thiss.props.token
        },
            url: '/api/notification',
            mode: 'cors'
        })
        .then(function (response) {
          thiss.setState({notifications: response.data.notification.reverse(), n: response.data.n});
        })
        .catch(function (error) {
            console.log("error");
        });
  }

  componentDidMount() {
    this.props.location.pathname = this.props.location.pathname.slice(1);
    let e = this.props.location.pathname;
    if(e=="") {
      e = "dashboard";
    }
    this.setState({component : e.charAt(0).toUpperCase() + e.slice(1), raw: e});
  }

  handleRequestClose = () => {
    this.setState({openNotification: false});
  }

  handleFeedback = () => {
    this.setState({feedback: !this.state.feedback});
  }

  Transition = (props) => {
  return <Slide direction="up" {...props} />;
  }

  tDrawer = (e) => {
    this.setState({open: !this.state.open});
    if(e) {
      if(!(String(e) === "[object Object]")) {
        browserHistory.push(e);
        this.setState({component : String(e).charAt(0).toUpperCase() + String(e).slice(1),raw: e});
      }
    }
  }

  deleteCookie = (name) => {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    localStorage.removeItem('token');
    localStorage.removeItem('remember');
    browserHistory.push('/');
    location.reload();
  }

  handleFeedbackSubmit = (msg) => {
    this.setState({feedback: false,feedbackSubmit: true});
    console.log(msg);
    const payload = {
        name: this.props.data.name,
        email: this.props.data.email,
        enrollment: this.props.data.enrollment,
        message: msg,
        token: this.props.token
    };
    const thiss = this;
    axios({
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
            url: '/api/feedback',
            mode: 'cors',
            data: JSON.stringify(payload)
        })
        .then(function (response) {
        })
        .catch(function (error) {
        });
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.tDrawer} className={classes.menuButton} color="contrast" aria-label="Menu">
              <div style={{border: "1px solid white",padding: "3px",borderRadius: "3px"}}>
                <MenuIcon/>
              </div>
              <Drawer toggleDrawer={this.tDrawer} open={this.state.open} raw={this.state.raw}/>
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              {this.state.component}
            </Typography>
            {this.state.n !== 0 && <IconButton color="contrast" onClick={() => {this.setState({openNotification: !this.state.openNotification})}}>
              <Badge color="accent" badgeContent={this.state.n} className={classnames('badge')}><NotificationIcon/></Badge>
            </IconButton>}
            {this.state.n === 0 && <IconButton color="contrast" onClick={() => {this.setState({openNotification: !this.state.openNotification})}}>
              <NotificationIcon/>
            </IconButton>}
            <IconButton onClick={() => {this.deleteCookie('token')}} color="contrast"><PowerIcon/></IconButton>
          </Toolbar>
        </AppBar>
        <div className={classnames('main-container')}>
          {this.props.children && React.cloneElement(this.props.children,{...this.props})}
        </div>
        <Dialog
          fullScreen
          open={this.state.openNotification}
          onRequestClose={this.handleRequestClose}
          transition={this.Transition}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography type="title" color="inherit" style={{flex: "1"}}>
                Notifications
              </Typography>
              <IconButton color="contrast" onClick={this.handleRequestClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classnames('main-container')} style={{height: "100vh",background: "#E8EAF6", overflowY: "auto"}}>
            <Notifications readNotification={this.readNotification} n={this.state.n} notifications={this.state.notifications}/>
          </div>
        </Dialog>
        <Tooltip id="tooltip-fab" title="Feedback" placement="bottom">
          <Button onClick={this.handleFeedback} fab color="primary" style={{flip: false,position: 'fixed',bottom: "25",right: "20"}} aria-label="Feedback">
            <FeedbackIcon style={{width: "30px", height: "30px"}}/>
          </Button>
        </Tooltip>
        <Feedback open={this.state.feedback} submit={this.handleFeedbackSubmit} handleClose={this.handleFeedback}/>
        <Dialog open={this.state.feedbackSubmit} transition={Slide} onRequestClose={() => {this.setState({feedbackSubmit: false})}}>
          <DialogTitle>{"Feedback Submitted"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
            Your feedback has been submitted successfully. If you posted any query or error.Our team will get back to you as soon as possible. Thanks for your valuable time.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {this.setState({feedbackSubmit: false})}} color="primary" raised>
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(ButtonAppBar);
