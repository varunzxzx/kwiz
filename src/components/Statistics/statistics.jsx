import React, { Component } from 'react';
import NotFoundIcon from 'material-ui-icons/RoomService';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Card, { CardContent } from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {Line} from 'react-chartjs-2';
import classnames from 'classnames';

class Statistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "",
      chartData:{
        labels: ['1', '2', '3', '4', '5'],
        datasets:[
          {
            label:'Progress',
            data:[
              0,
              0,
              0,
              60,
              90
            ],
            backgroundColor:[
              'rgba(54, 162, 235, 0.6)'
            ]
          }
        ]
      }
    }
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

  handleSelected = (e) => {
    this.onresize(e);
  }

  desktop = (e) => {
    return(
      <div className="dash">
        <div style={{flexGrow: "1",width: "95%", margin: "auto"}}>
          <Grid container spacing={24}>
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Typography type="body2" gutterBottom>
                    Choose a topic
                  </Typography>
                  <Divider />
                  <List>
                    {["Basics","Classes & Inheritance","Function Overloading","Constructor & Destructor","Pointer","Array","Polymorphism"].map((value,i) => {
                      return(
                        <ListItem className={e == value?classnames('selected'):classnames('selecte')} onClick={() => {this.handleSelected(value)}} key={value} button>
                          <ListItemText primary={value} />
                        </ListItem>
                      )
                    })}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={8}>
              <Card>
                <CardContent>
                  <Line
                    height={260}
                  	data={this.state.chartData}
                    options={{
                  		maintainAspectRatio: false
                  	}}
                  />
                </CardContent>
              </Card>
              <Grid container spacing={24} style={{marginTop: "10px"}}>
                <Grid item xs={6}>
                  <Card>
                    <CardContent style={{margin: "0",padding: "0"}}>
                      <Typography align="center" style={{background: "#283593",color: "white"}} type="body2" gutterBottom>
                        Average Score
                      </Typography>
                      <Typography align="center" type="display3" gutterBottom>
                        42.32
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card>
                    <CardContent style={{margin: "0",padding: "0"}}>
                      <Typography align="center" style={{background: "#283593",color: "white"}} type="body2" gutterBottom>
                        Overall Rank
                      </Typography>
                      <Typography align="center" type="display3" gutterBottom>
                        16
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
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

  onresize = (e) => {
    let width = window.innerWidth;
    if (width > 768) {
       this.setState({renderComponent: this.desktop(e)})
     } else {
       this.setState({renderComponent: this.mobile(e)})
     }
  }

  render() {
    return this.state.renderComponent;
  }
}

export default Statistics;
