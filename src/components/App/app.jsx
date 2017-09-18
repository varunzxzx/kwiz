import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class App extends Component {
  change = () => {
    browserHistory.push('/statistics')
  }

  render() {
    return (
      <div className="jumbotron">
        <h1>Hello World!</h1>
        <button onClick ={() => {this.change()}}>Clickme</button>
      </div>
    )
  }
}

export default App;
