import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
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
        <div>KWIZ</div>
        <div tabIndex={0} role="button" className="mainList">
          <Divider />
          <List className={classes.list} onClick={() => {this.handleClick('dashboard')}}>{
            <ListItem button>
              <ListItemIcon className={this.state.active=='dashboard'?classes.listItem:classes.listIte}>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText className={this.state.active=='dashboard'?classnames('listText'):classnames('listTet')} primary="Dashboard" />
            </ListItem>
          }</List>
          <List className={classes.list} onClick={() => {this.handleClick('statistics')}}>{
            <ListItem button>
              <ListItemIcon className={this.state.active=='statistics'?classes.listItem:classes.listIte}>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText className={this.state.active=='statistics'?classnames('listText'):classnames('listTet')} primary="Statistics"/>
            </ListItem>
          }</List>
        </div>
        <Divider />
      </Drawer>
    )
  }
}

export default withStyles(styles)(sDrawer);
