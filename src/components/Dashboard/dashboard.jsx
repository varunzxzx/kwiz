import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData:{
        labels: ['1', '2', '3', '4', '5'],
        datasets:[
          {
            label:'Current Progress',
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
  }

  render() {
    return(
      <div id="dash">
          <Line
            height={260}
            width={60}
          	data={this.state.chartData}
            options={{
          		maintainAspectRatio: false
          	}}
        />
      </div>
    )
  }
}

export default Dashboard;
