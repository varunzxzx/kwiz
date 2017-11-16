import React, { Component } from 'react';
import {Line, Pie} from 'react-chartjs-2';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ReorderIcon from 'material-ui-icons/Reorder';
import RankIcon from 'material-ui-icons/SupervisorAccount';
import AverageIcon from 'material-ui-icons/Equalizer';
import PlayedIcon from 'material-ui-icons/Games';
import FunctionIcon from 'material-ui-icons/Functions';
import Grid from 'material-ui/Grid';
import axios from 'axios';
import classnames from 'classnames';
import { CircularProgress } from 'material-ui/Progress';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {},
      pieData: {},
      loading: true,
      reading: [
        {
          title: "Exception Handling in C++",
          link: "http://www.geeksforgeeks.org/exception-handling-c/",
          source: "GeeksforGeeks"
        },
        {
          title: "Friendship and inheritance",
          link: "http://www.cplusplus.com/doc/tutorial/inheritance/",
          source: "CPlusPlus"
        },
        {
          title: "C++ Tricks",
          link: "http://codeforces.com/blog/entry/15643",
          source: "CodeForces"
        }
      ],
      quesAttempt: "",
      quizPlay: "",
      rank: "",
      average: ""
    }
  }

  componentWillMount() {
    const thiss = this;
    axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': this.props.token
        },
            url: '/api/dashboard',
            mode: 'cors'
        })
        .then(function (response) {
          let data = response.data.overall.map(data => {
            return data*10;
          });
          let pieData = {
            labels: ['Basics', 'Classes & Inheritance', 'Function Overloading', 'Constructor & Destructor', 'Pointer', 'Array', 'Polymorphism'],
            datasets:[
              {
                label:'Progress',
                data:data,
                backgroundColor:[
                  'rgba(255, 99, 132, 0.9)',
                  'rgba(54, 162, 235, 0.9)',
                  'rgba(255, 206, 86, 0.9)',
                  'rgba(75, 192, 192, 0.9)',
                  'rgba(153, 102, 255, 0.9)',
                  'rgba(255, 159, 64, 0.9)',
                  'rgba(255, 206, 132, 0.9)'
                ]
              }
            ]
          };

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
          };
          thiss.setState({
            chartData: chartData,
            pieData: pieData,
            quesAttempt: response.data.quesAttempt,
            quizPlay: response.data.quizPlay,
            rank: response.data.rank,
            average: response.data.average,
            loading: false
          });
        })
        .catch(function (error) {
            console.log("error");
        });
  }

  render() {
    const styles = {
      inner: {
        padding: "15px 0px 10px 15px",
        textAlign: "left",
        height: "80px",
      },
      transparent: {
        position: "relative",
        width: "60px",
        height: "60px",
        bottom: "60px",
        right: "-74%",
        fillOpacity: "0.6"
      }
    }
    return(
      <div className="dash">
        {this.state.loading && <div><div className={classnames('loading m')}><CircularProgress size={80} /></div></div>}
        {!this.state.loading &&
          <div>
            <div style={{width: "95%",margin: "auto"}}>
              <Card>
                <CardContent>
                    <Line
                    	data={this.state.chartData}
                      height={260}
                      options={{maintainAspectRatio: false}}
                    />
                </CardContent>
              </Card>
            </div>
            <div style={{flexGrow: "1",width: "95%",margin: " 15px auto 15px auto"}}>
              <Grid container spacing={0}>
                  <Grid item md={3} sm={6} xs={12} style={{...styles.inner,background:"#FF7043",borderBottom: "5px solid #BF360C"}}>
                    <Typography type="headline" style={{marginBottom: "2px",fontSize: "30px"}} gutterBottom>
                      {this.state.rank}
                    </Typography>
                    <Typography type="body1" style={{fontFamily:"Source Sans Pro",fontSize: "16px"}} gutterBottom>
                      Overall Rank
                    </Typography>
                    <RankIcon style={{...styles.transparent,color: "#BF360C"}}/>
                  </Grid>
                  <Grid item md={3} sm={6} xs={12} style={{...styles.inner,background:"#9FA8DA",borderBottom: "5px solid #3949AB"}}>
                    <Typography type="headline" style={{marginBottom: "2px",fontSize: "30px"}} gutterBottom>
                      {this.state.average}%
                    </Typography>
                    <Typography type="body1" style={{fontFamily:"Source Sans Pro",fontSize: "16px"}} gutterBottom>
                      Average Score
                    </Typography>
                    <AverageIcon style={{...styles.transparent,color: "#3949AB"}}/>
                  </Grid>
                  <Grid item md={3} sm={6} xs={12} style={{...styles.inner,background:"#66BB6A",borderBottom: "5px solid #1B5E20"}}>
                    <Typography type="headline" style={{marginBottom: "2px",fontSize: "30px"}} gutterBottom>
                      {this.state.quesAttempt}
                    </Typography>
                    <Typography type="body1" style={{fontFamily:"Source Sans Pro",fontSize: "16px"}} gutterBottom>
                      Questions Attempted
                    </Typography>
                    <FunctionIcon style={{...styles.transparent,color: "#1B5E20"}}/>
                  </Grid>
                  <Grid item md={3} sm={6} xs={12} style={{...styles.inner,background:"#FFC107",borderBottom: "5px solid #FF6F00"}}>
                    <Typography type="headline" style={{marginBottom: "2px",fontSize: "30px"}} gutterBottom>
                      {this.state.quizPlay}
                    </Typography>
                    <Typography type="body1" style={{fontFamily:"Source Sans Pro",fontSize: "16px"}} gutterBottom>
                      Quizzes Played
                    </Typography>
                    <PlayedIcon style={{...styles.transparent,color: "#FF6F00"}}/>
                  </Grid>
              </Grid>
            </div>
            <div style={{flexGrow: "1",width: "95%",margin: "auto"}}>
              <Grid container spacing={24}>
                <Grid item md={7} xs={12}>
                  <Card>
                    <CardContent>
                      <Typography type="subheading" style={{fontWeight: "bold"}} gutterBottom>
                        Recommended Reading
                      </Typography>
                      <List>
                      {this.state.reading.map((read,i) => {
                        return(
                          <a target="_blank" rel="nofollow" key={i} style={{textDecoration: "none"}} href={read.link}>
                            <ListItem button>
                              <Avatar>
                                <ReorderIcon />
                              </Avatar>
                              <ListItemText primary={read.title} secondary={read.source} />
                            </ListItem>
                          </a>
                        )
                      })}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md={5} xs={12}>
                  <Card style={{height: "290px"}}>
                    <CardContent>
                      <Typography type="subheading" style={{fontWeight: "bold"}} gutterBottom>
                        Overall Progress
                      </Typography>
                      <Pie
                        data={this.state.pieData}
                        options={{
                          title:{
                            display:false,
                            text:'Overall Progress',
                            fontSize:16,
                            fontFamily: "Roboto",
                            fontColor: "black"
                          },
                          legend:{
                            display:true,
                            position:"right"
                          }
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Dashboard;
