import React, { Component } from 'react';
import NotFoundIcon from 'material-ui-icons/roomService';
import Typography from 'material-ui/Typography';

class Statistics extends Component {
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

export default Statistics;
