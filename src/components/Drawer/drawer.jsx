import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';

const styles = {
  list: {
    width: 250,
    flex: 'initial',
  },
  listFull: {
    width: 'auto',
    flex: 'initial',
  },
};

class sDrawer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const classes = this.props.classes;
    const sideList = (
      <div>
        <List className={classes.list}>{<div>hi</div>}</List>
        <Divider />
        <List className={classes.list}>{<div>hello</div>}</List>
      </div>
    );
    return(

      <Drawer open={this.props.open} onRequestClose={() => {this.props.toggleDrawer()}}>
        <div tabIndex={0} role="button" onClick={() => {this.props.toggleDrawer()}}>
          {sideList}
        </div>
      </Drawer>
    )
  }
}

export default withStyles(styles)(sDrawer);
