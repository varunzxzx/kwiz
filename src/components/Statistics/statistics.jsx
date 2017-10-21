import React, { Component } from 'react';
import NotFoundIcon from 'material-ui-icons/RoomService';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

class Statistics extends Component {
  constructor(props) {
    super(props);

    this.state = {}
    let width = window.innerWidth;
    if (width > 768) {
      this.state.renderComponent = this.desktop();
     } else {
       this.state.renderComponent = this.mobile();
     }
    window.addEventListener('resize', () => {
      this.onresize();
    }, true);
  }

  desktop = () => {
    return(
      <div className="dash">
        <div style={{flexGrow: "1",width: "95%", margin: "auto"}}>
          <Grid container spacing={24}>
            <Grid item xs={4}>
              Hello, I am Left
            </Grid>
            <Grid item xs={8}>
              Hello I am Right
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }

  mobile = () => {
    return(
      <div className="dash">
        <h1>Hello, This is mobile</h1>
      </div>
    )
  }

  onresize = () => {
    let width = window.innerWidth;
    if (width > 768) {
       this.setState({renderComponent: this.desktop()})
     } else {
       this.setState({renderComponent: this.mobile()})
     }
  }

  render() {
    return this.state.renderComponent;
  }
}

export default Statistics;
