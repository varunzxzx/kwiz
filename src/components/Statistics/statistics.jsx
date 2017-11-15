import React, { Component } from 'react';
import NotFoundIcon from 'material-ui-icons/RoomService';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Card, { CardContent } from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {Line} from 'react-chartjs-2';
import classnames from 'classnames';
import axios from 'axios';
import Responsive from 'react-responsive';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl} from 'material-ui/Form';
import Select from 'material-ui/Select';

const Desktop = ({ children }) => <Responsive minWidth={768} children={children} />;
const Mobile = ({ children }) => <Responsive maxWidth={767} children={children} />;

class Statistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {},
      rank: "",
      average: "",
      e: ""
    }
  }

  componentWillMount() {
    this.getData("Basics");
  }

  getData = (e) => {
    const thiss = this;
    let arr;
    let str = "";
    let flag = false;
    arr = e.toLowerCase().split(" ");
    arr.map(value => {
      if(value != "&") {
        if(flag) {
          value = value.charAt(0).toUpperCase() + value.slice(1);
          str += value;
        } else {
          flag = true;
          str += value;
        }
      }
    });
    this.setState({e})
    axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': this.props.token,
            'x-access-type': str
        },
            url: '/api/statistics',
            mode: 'cors'
        })
        .then(function (response) {
          let chartData = {
            labels: ['1', '2', '3', '4', '5'],
            datasets:[
              {
                label:'Progress',
                data:response.data.progress,
                backgroundColor:[
                  'rgba(54, 162, 235, 0.6)'
                ]
              }
            ]
          }
          thiss.setState({
            chartData: chartData,
            average: response.data.average,
            rank: response.data.rank
          });
          console.log("success");
        })
        .catch(function(err) {
          console.log("error");
        })
}

  handleSelected = (e) => {
    this.getData(e);
  }

  render() {
    return (
      <div>
        <Desktop>
          <div className="dash">
            <div style={{flexGrow: "1",width: "95%", margin: "auto"}}>
              <Grid container spacing={16}>
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
                            <ListItem className={this.state.e == value?classnames('selected'):classnames('selecte')} onClick={() => {
                              if(this.state.e != value){this.handleSelected(value)}
                            }} key={value} button>
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
                  <Grid container spacing={16} style={{marginTop: "10px"}}>
                    <Grid item xs={6}>
                      <Card>
                        <CardContent style={{margin: "0",padding: "0"}}>
                          <Typography align="center" style={{background: "#1565C0",color: "white"}} type="body2" gutterBottom>
                            Rank
                          </Typography>
                          <Typography align="center" type="display3" gutterBottom>
                            {this.state.rank}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={6}>
                      <Card>
                        <CardContent style={{margin: "0",padding: "0"}}>
                          <Typography align="center" style={{background: "#1565C0",color: "white"}} type="body2" gutterBottom>
                            Average Score
                          </Typography>
                          <Typography align="center" type="display3" gutterBottom>
                            {this.state.average}%
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
        </Desktop>
        <Mobile>
          <div className="dash">
            <div style={{flexGrow: "1",width: "95%", margin: "auto"}}>
              <Grid container spacing={16}>
                <div style={{width: "95%", margin: "auto"}}>
                  <Grid style={{width: "99%"}}>
                    <FormControl style={{minWidth: "99%"}}>
                      <InputLabel htmlFor="select">Topic</InputLabel>
                      <Select
                        native
                        value={this.state.e}
                        onChange={(e) => {this.handleSelected(e.target.value)}}
                        input={<Input id="select" />}
                      >
                        {["Basics","Classes & Inheritance","Function Overloading","Constructor & Destructor","Pointer","Array","Polymorphism"].map((value,i) => {
                          return(
                            <option value={value} key={i}>{value}</option>
                          )
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </div>
                <Grid item xs={12}>
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
                </Grid>
                {/* <Grid container spacing={16} style={{marginTop: "10px"}}> */}
                  <Grid item xs={6}>
                    <Card>
                      <CardContent style={{margin: "0",padding: "0"}}>
                        <Typography align="center" style={{background: "#1565C0",color: "white"}} type="body2" gutterBottom>
                          Rank
                        </Typography>
                        <Typography align="center" type="display3" gutterBottom>
                          {this.state.rank}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent style={{margin: "0",padding: "0"}}>
                        <Typography align="center" style={{background: "#1565C0",color: "white"}} type="body2" gutterBottom>
                          Average Score
                        </Typography>
                        <Typography align="center" type="display3" gutterBottom>
                          {this.state.average}%
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                {/* </Grid> */}
              </Grid>
            </div>
          </div>
        </Mobile>
      </div>
    )
  }
}

export default Statistics;
