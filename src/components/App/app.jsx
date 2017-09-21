import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { withStyles } from 'material-ui/styles';
import Drawer from '../Drawer/drawer.jsx';

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
      raw: ""
    }
  }

  componentDidMount() {
    this.props.location.pathname = this.props.location.pathname.slice(1);
    let e = this.props.location.pathname;
    if(e=="") {
      e = "dashboard";
    }
    this.setState({component : e.charAt(0).toUpperCase() + e.slice(1), raw: e});
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

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.tDrawer} className={classes.menuButton} color="contrast" aria-label="Menu">
              <MenuIcon/>
              <Drawer toggleDrawer={this.tDrawer} open={this.state.open} raw={this.state.raw}/>
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              {this.state.component}
            </Typography>
            <Button onClick={() => {this.deleteCookie('token')}} color="contrast">SIGN OUT</Button>
          </Toolbar>
        </AppBar>
        <div>
          {this.props.children && React.cloneElement(this.props.children,{...this.props})}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(ButtonAppBar);
