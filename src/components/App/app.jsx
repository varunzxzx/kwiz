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
      open: true
    }
  }

  tDrawer = () => {
    console.log(this.state.open);
    this.setState({open: !this.state.open});
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
              <MenuIcon onClick={this.tDrawer}/>
              <Drawer toggleDrawer={this.tDrawer} open={this.state.open}/>
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              Dashboard
            </Typography>
            <Button color="contrast">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(ButtonAppBar);
