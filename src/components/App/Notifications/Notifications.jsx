import React from 'react';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const styles = theme => ({
  card: {
    maxWidth: "95%",
    margin: "10px auto 0 auto",
    cursor: "pointer",
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  flexGrow: {
    flex: '1 1 auto',
  },
});

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: this.props.notifications,
      n: this.props.n,
      status: []
    }
  }

  componentWillMount() {
    let tempStatus = [];
    for(let i=0;i<this.props.notifications.length;i++) {
      tempStatus.push({expanded: false,isLiked: false});
    }
    this.setState({status: tempStatus});
  }

  handleExpandClick = (i) => {
    let tempStatus = this.state.status;
    tempStatus[i].expanded = !tempStatus[i].expanded;
    this.setState({ status: tempStatus });
    this.props.readNotification(this.state.notifications[i]._id);
  };

  handleLike = (i,e) => {
    e.stopPropagation();
    let tempStatus = this.state.status;
    tempStatus[i].isLiked = !tempStatus[i].isLiked;
    this.setState({status: tempStatus})
  }

  handleShare = (e) => {
    e.stopPropagation();
    e.preventDefault();
  const facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=https://kwiz-msi.herokuapp.com', 'facebook-popup', 'height=350,width=600');
  if(facebookWindow.focus) { facebookWindow.focus(); }
    return false;
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {
          this.state.notifications.map((notification,i) => {
            return(
              <Card key={i} onClick={() => {this.handleExpandClick(i)}} className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      {notification.avatar}
                    </Avatar>
                  }
                  title={notification.title}
                  subheader={notification.date}
                />
                <CardContent>
                  <Typography component="p">
                    {notification.description}
                  </Typography>
                </CardContent>
                <CardActions disableActionSpacing>
                  <IconButton onClick={(e) => {this.handleLike(i,e)}} aria-label="Add to favorites">
                    <FavoriteIcon style={this.state.status[i].isLiked?{color: "#5C6BC0"}:null}/>
                  </IconButton>
                  <IconButton onClick={this.handleShare} aria-label="Share">
                    <ShareIcon />
                  </IconButton>
                  <div className={classes.flexGrow} />
                  <IconButton
                    className={classnames(classes.expand, {
                      [classes.expandOpen]: this.state.status[i].expanded,
                    })}
                    onClick={() => {this.handleExpandClick(i)}}
                    aria-expanded={this.state.status[i].expanded}
                    aria-label="Show more"
                  >
                    <ExpandMoreIcon onClick={() => {this.handleExpandClick(i)}}/>
                  </IconButton>
                </CardActions>
                <Collapse in={this.state.status[i].expanded} transitionDuration="auto" unmountOnExit>
                  <CardContent>
                    {<div dangerouslySetInnerHTML={{__html: notification.brief}}></div>}
                  </CardContent>
                </Collapse>
              </Card>
            )
          })
        }
      </div>
    );
  }
}

export default withStyles(styles)(Notifications);
