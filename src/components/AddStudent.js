import Button from '@mui/material/Button';
import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

/* properties addStudent is required, function called when Add clicked.
/  Initializes student_name and student_email variables */
class AddStudent extends Component {
    constructor(props) {
    super(props);
    this.state = {open: false, student_name:"", student_email:"" };
  };
  
  // Open and close modal form
  handleClickOpen = () => {
    this.setState( {open:true, width:400} );
  };

  handleClose = () => {
    this.setState( {open:false} );
  };

  // Change name and email variables
  handleChange = (eventS) => {
    this.setState({[eventS.target.name]: eventS.target.value});
  }

// Save course and close modal form
  handleAdd = () => {
     this.props.addStudent({student_name: this.state.student_name, student_email: this.state.student_email});
     this.handleClose();
  }

  render()  { 
    return (
        <div>
          <Button id="studentButton" variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
            Add Student
          </Button>
          <Dialog open={this.state.open} onClose={this.handleClose}>
              <DialogTitle>Add Student</DialogTitle>
              <DialogContent  style={{paddingTop: 20}} >
                <TextField autoFocus fullWidth id='studName' label="Student Name" name="student_name" onChange={this.handleChange}  />
                <br></br>
                <br></br>
                <TextField autoFocus fullWidth id='studEmail' label="Student Email" name="student_email" onChange={this.handleChange}  /> 
              </DialogContent>
              <DialogActions>
                <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                <Button id="AddStud" color="primary" onClick={this.handleAdd}>Add</Button>
              </DialogActions>
            </Dialog>      
        </div>
    ); 
  }
}

// required property:  addStudent is a function to call to perform the Add Student action
AddStudent.propTypes = {
addStudent : PropTypes.func.isRequired
}

export default AddStudent;