import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import {CircularProgress} from 'material-ui/Progress';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import NotFoundIcon from 'material-ui-icons/RoomService';
import Typography from 'material-ui/Typography';

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: [],
      loading: false
    }
  }

  componentWillMount() {
    this.setState({loading: true})
    const thiss = this;
    axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': this.props.token
        },
            url: '/api/leaderboard',
            mode: 'cors'
        })
        .then(function (response) {
          thiss.setState({stats: response.data.stats, loading: false});
          console.log(response.data);
        })
        .catch(function (error) {
            thiss.setState({loading: false});
            console.log("error");
        });
  }

  render() {
    return(
      <div className="dash">
        {this.state.loading && <div><div className={classnames('loading m')}><CircularProgress size={80} /></div></div>}
        {!this.state.loading && <Paper style={{width: "80%", margin: "auto", overflowX: "auto"}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell numeric>Rank</TableCell>
                <TableCell numeric>Enrollment</TableCell>
                <TableCell numeric>Name</TableCell>
                <TableCell numeric>Score</TableCell>
                <TableCell numeric>Quiz Played</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.stats.map((n,i) => {
                return (
                  <TableRow key={i} style={i===0?{background: "#1976D2", color: "white",fontWeight: "700"}:(i===1?{background: "#2196F3", color: "white",fontWeight: "700"}:(i===2?{background: "#64B5F6", color: "white",fontWeight: "700"}:{background: "#90CAF9",color: "black"}))}>
                    <TableCell numeric>{i+1}</TableCell>
                    <TableCell numeric>{n.enrollment}</TableCell>
                    <TableCell numeric>{n.name}</TableCell>
                    <TableCell numeric>{n.total*10}</TableCell>
                    <TableCell numeric>{n.quizPlay}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      }
      </div>
    )
  }
}

export default Leaderboard;
