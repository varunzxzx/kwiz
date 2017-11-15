import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import classnames from 'classnames';
import Card, { CardContent } from 'material-ui/Card';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.data.name,
      enrollment: this.props.data.enrollment,
      email: this.props.data.email,
      phone: this.props.data.phone,
      course: this.props.data.course
    }
  }
  render() {
    return(
      <div className="dash">
        <Card style={{width: "80%", maxWidth: "400px",margin: "auto"}}>
          <CardContent>
            <form style={{display: 'flex',flexWrap: 'wrap'}}>
              <TextField
                id="name"
                label="Name"
                value={this.state.name}
                margin="normal"
                className={classnames('text-input')}
                style={{width: "300px", margin: "auto"}}
              />
              <br />
              <TextField
                id="enrollment"
                label="Enrollment"
                value={this.state.enrollment}
                margin="normal"
                className={classnames('text-input')}
                style={{width: "300px", margin: "20px auto"}}
              />
              <br />
              <TextField
                id="email"
                label="Email"
                value={this.state.email}
                margin="normal"
                className={classnames('text-input')}
                style={{width: "300px", margin: "20px auto"}}
              />
              <br />
              <TextField
                id="phone"
                label="Phone"
                value={this.state.phone}
                margin="normal"
                className={classnames('text-input')}
                style={{width: "300px", margin: "20px auto"}}
              />
              <br />
              <TextField
                id="course"
                label="Course"
                value={this.state.course}
                margin="normal"
                className={classnames('text-input')}
                style={{width: "300px", margin: "20px auto"}}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default Profile;
