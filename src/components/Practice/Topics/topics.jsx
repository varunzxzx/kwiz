import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Card, { CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import classnames from 'classnames';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 300,
    //background: theme.palette.background.paper,
  },
  card: {
    width: '90%',
    minWidth: 275,
    margin: 'auto',
    marginTop: '3%',
  },
});

class Topics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      noSelect: false
    }
  }

  handleSelected = (e) => {
    this.setState({selected: e});
  }

  handleSubmit = () => {
    if(this.state.selected === "") {
      this.setState({noSelect: true});
    } else {
      this.props.submit(this.state.selected);
    }
  }

  render() {
    const classes = this.props.classes;
    return(
      <div className={classnames('topics')}>
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.root}>
              <List>
                <Typography type="body2" gutterBottom>
                  Choose a topic
                </Typography>
                {["Basics","Classes & Inheritance","Function Overloading","Constructor & Destructor","Pointers","Arrays","Polymorphism"].map(value => {
                  return(
                    <ListItem className={this.state.selected == value?classnames('selected'):classnames('selecte')} key={value} button onClick={() => {this.handleSelected(value)}}>
                      <ListItemText primary={value} />
                    </ListItem>
                  )
                })}
              </List>
            </div>
          </CardContent>
        </Card>
        <Button raised color="primary" onClick={() => {this.handleSubmit()}} className={classnames('login-btn')}>
          CONTINUE
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(Topics);
