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
      open: false
    }
  }

  tDrawer = (e) => {
    this.setState({open: !this.state.open});
    if(e) {
      browserHistory.push(e);
    }
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.tDrawer} className={classes.menuButton} color="contrast" aria-label="Menu">
              <MenuIcon/>
              <Drawer toggleDrawer={this.tDrawer} open={this.state.open}/>
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              Dashboard
            </Typography>
            <Button color="contrast">Login</Button>
          </Toolbar>
        </AppBar>
        <div>
          {this.props.children && React.cloneElement(this.props.children)}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(ButtonAppBar);
