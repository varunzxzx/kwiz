import React, { Component } from 'react';
import axios from 'axios';

class Practice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
  }

  componentDidMount = () => {
    this.getQuestions();
  }

  getQuestions = () => {
    const thiss = this;
    axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': this.props.token,
            'x-access-type': 'basics'
        },
            url: '/api/getQuestion',
            mode: 'cors'
        })
        .then(function (response) {
          thiss.setState({questions: response.data});
        })
        .catch(function (error) {
            //thiss.setState({ tokenExpired : true, isLoading: false })
            console.log("error");
        });
  }

  render() {
    return(
      <h1>Practice</h1>
    )
  }
}

export default Practice;
