import React, { Component } from 'react';
import NotFoundIcon from 'material-ui-icons/RoomService';
import Typography from 'material-ui/Typography';

class Leaderboard extends Component {
  render() {
    return(
      <div id="notfound">
        <NotFoundIcon/>
        <Typography type="display3" gutterBottom>
          Coming Soon...
        </Typography>
      </div>
    )
  }
}

export default Leaderboard;
