import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ReorderIcon from 'material-ui-icons/Reorder';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      },
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
          source: "Code Forces"
        }
      ],
      pieData:{
        labels: ['Basics', 'Classes & Inheritance', 'Function Overloading', 'Constructor & Destructor', 'Pointer', 'Array', 'Polymorphism'],
        datasets:[
          {
            label:'Progress',
            data:[
              617594,
              181045,
              153060,
              106519,
              105162,
              95072
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      }
    }
  }

  render() {
    const styles = {
      item: {
        textAlign: "center",
        margin: "10px auto",
        padding: "10px"
      },
      inner: {
        padding: "15px 0px 10px 15px",
        textAlign: "left",
        height: "80px"
      }
    }
    return(
      <div id="dash">
          <Card style={{width: "95%",margin: "auto"}}>
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
          <div className="row" style={{width: "95%",margin: "auto"}}>
            <div className="col-md-3 col-sm-12" style={{...styles.item,paddingLeft: "0px"}}>
              <div style={{...styles.inner,background: "#FF7043",borderBottom: "5px solid #BF360C"}}>
                <Typography type="headline" style={{marginBottom: "2px",fontSize: "30px"}} gutterBottom>
                  16
                </Typography>
                <Typography type="body1" style={{fontSize: "16px"}} gutterBottom>
                  Overall Rank
                </Typography>
              </div>
            </div>
            <div className="col-md-3 col-sm-12" style={styles.item}>
              <div style={{...styles.inner,background: "#9FA8DA",borderBottom: "5px solid #3949AB"}}>
                <Typography type="headline" style={{marginBottom: "2px",fontSize: "30px"}} gutterBottom>
                  42.32%
                </Typography>
                <Typography type="body1" style={{fontSize: "16px"}} gutterBottom>
                  Average Score
                </Typography>
              </div>
            </div>
            <div className="col-md-3 col-sm-12" style={styles.item}>
              <div style={{...styles.inner,background: "#66BB6A",borderBottom: "5px solid #1B5E20"}}>
                <Typography type="headline" style={{marginBottom: "2px",fontSize: "30px"}} gutterBottom>
                  24
                </Typography>
                <Typography type="body1" style={{fontSize: "16px"}} gutterBottom>
                  Questions Attempted
                </Typography>
              </div>
            </div>
            <div className="col-md-3 col-sm-12" style={{...styles.item,paddingRight: "0px"}}>
              <div style={{...styles.inner,background: "#FFC107",borderBottom: "5px solid #FF6F00"}}>
                <Typography type="headline" style={{marginBottom: "2px",fontSize: "30px"}} gutterBottom>
                  12
                </Typography>
                <Typography type="body1" style={{fontSize: "16px"}} gutterBottom>
                  Quizzes Played
                </Typography>
              </div>
            </div>
          </div>
          <div className="row" style={{width: "95%",margin: "auto"}}>
            <div className="col-md-7 col-xs-12" style={{paddingLeft: "0px"}}>
              <Card>
                <CardContent>
                  <Typography type="subheading" style={{fontWeight: "bold"}} gutterBottom>
                    Recommended Reading
                  </Typography>
                  <List>
                  {this.state.reading.map((read,i) => {
                    return(
                      <a key={i} style={{textDecoration: "none"}} href={read.link}>
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
            </div>
            <div className="col-md-5 col-xs-12" style={{paddingRight: "0px"}}>
              <Card>
                <CardContent>
                  <Pie
                    data={this.state.pieData}
                    options={{
                      title:{
                        display:true,
                        text:'Overall Progress',
                        fontSize:22
                      },
                      legend:{
                        display:true,
                        position:"right"
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
      </div>
    )
  }
}

export default Dashboard;
