import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: ""
    }
  }

  render() {
    return(
      <Dialog open={this.props.open} onRequestClose={this.props.handleClose}>
          <DialogTitle>Feedback Form</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This is like as free territory area and you can shoot us here, an e-mail. If you found some error or need some help, then please feel free to poke us. We love to help!
              Do you have any suggestion?
              We would love to hear it from you, your opinions are always welcomed!
            </DialogContentText>
            <TextField
              autoFocus
              id="multiline-static"
              label="Type your message here"
              multiline
              rows="4"
              margin="dense"
              fullWidth
              value={this.state.msg}
              onChange={(e) => {this.setState({msg: e.target.value})}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {this.setState({msg: ""});this.props.submit(this.state.msg)}} color="primary">
              Send
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
}

export default Feedback;
