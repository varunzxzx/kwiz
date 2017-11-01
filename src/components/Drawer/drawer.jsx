import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import DashboardIcon from 'material-ui-icons/Dashboard';
import TimelineIcon from 'material-ui-icons/Timeline';
import PracticeIcon from 'material-ui-icons/Code';
import ContestIcon from 'material-ui-icons/Casino';
import LeaderboardIcon from 'material-ui-icons/Stars';
import ProfileIcon from 'material-ui-icons/AccountCircle'
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';

const styles = {
  list: {
    width: 250,
    flex: 'initial',
  },
  listItem: {
    color: '#3F51B5',
  },
};

class sDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: ""
    }
  }

  componentWillReceiveProps() {
    this.setState({active: this.props.raw})
  }

  handleClick = (e) => {
    this.setState({active: e});
    this.props.toggleDrawer(e);
  }
  render() {
    const classes = this.props.classes;
    return(
      <Drawer open={this.props.open} width={250} onRequestClose={() => {this.props.toggleDrawer()}}>
        <div className={classnames('logo')}><img src="uploads/logo.PNG" alt="KWIZ logo" title="KWIZ logo"/>  <span>KWIZ</span></div>
        <div tabIndex={0} role="button" className="mainList">
          <Divider />
          <List className={classes.list} onClick={() => {this.handleClick('dashboard')}}>{
            <ListItem button>
              <ListItemIcon className={this.state.active=='dashboard'?classes.listItem:classes.listIte}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText className={this.state.active=='dashboard'?classnames('listText'):classnames('listTet')} primary="Dashboard" />
            </ListItem>
          }</List>
          <List className={classes.list} onClick={() => {this.handleClick('practice')}}>{
            <ListItem button>
              <ListItemIcon className={this.state.active=='practice'?classes.listItem:classes.listIte}>
                <PracticeIcon />
              </ListItemIcon>
              <ListItemText className={this.state.active=='practice'?classnames('listText'):classnames('listTet')} primary="Practice"/>
            </ListItem>
          }</List>
          <List className={classes.list} onClick={() => {this.handleClick('contest')}}>{
            <ListItem button>
              <ListItemIcon className={this.state.active=='contest'?classes.listItem:classes.listIte}>
                <ContestIcon />
              </ListItemIcon>
              <ListItemText className={this.state.active=='contest'?classnames('listText'):classnames('listTet')} primary="Contest"/>
            </ListItem>
          }</List>
          <List className={classes.list} onClick={() => {this.handleClick('statistics')}}>{
            <ListItem button>
              <ListItemIcon className={this.state.active=='statistics'?classes.listItem:classes.listIte}>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText className={this.state.active=='statistics'?classnames('listText'):classnames('listTet')} primary="Statistics"/>
            </ListItem>
          }</List>
          <List className={classes.list} onClick={() => {this.handleClick('resources')}}>{
            <ListItem button>
              <ListItemIcon className={this.state.active=='resources'?classes.listItem:classes.listIte}>
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText className={this.state.active=='resources'?classnames('listText'):classnames('listTet')} primary="Resources"/>
            </ListItem>
          }</List>
          <List className={classes.list} onClick={() => {this.handleClick('leaderboard')}}>{
            <ListItem button>
              <ListItemIcon className={this.state.active=='leaderboard'?classes.listItem:classes.listIte}>
                <LeaderboardIcon />
              </ListItemIcon>
              <ListItemText className={this.state.active=='leaderboard'?classnames('listText'):classnames('listTet')} primary="Leaderboard"/>
            </ListItem>
          }</List>
          <List className={classes.list} onClick={() => {this.handleClick('profile')}}>{
            <ListItem button>
              <ListItemIcon className={this.state.active=='profile'?classes.listItem:classes.listIte}>
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText className={this.state.active=='profile'?classnames('listText'):classnames('listTet')} primary="Profile"/>
            </ListItem>
          }</List>
        </div>
        <Divider />
        <div className="footer">Designed & Developed By <div><a href="http://www.mvarun.me" target="_blank">Varun</a></div></div>
      </Drawer>
    )
  }
}

export default withStyles(styles)(sDrawer);
