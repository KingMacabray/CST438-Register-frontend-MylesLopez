
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import {SEMESTER_LIST, SERVER_URL, STUDNAMES} from '../constants.js'
import Grid from '@mui/material/Grid';
import {DataGrid} from '@mui/x-data-grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


import Button from '@mui/material/Button';
import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

// properties addCoure is required, function called when Add clicked.
class AddStudent extends Component {
    constructor(props) {
    super(props);
    this.state.student = {open: false, student:{ } };
  };
  
  handleClickOpen = () => {
    this.setState( {open:true} );
  };

  handleClose = () => {
    this.setState( {open:false} );
  };

  handleChangeName = (event) => {
    this.setState({student:{student_name: event.target.value}});
  }

  handleChangeEmail = (event) => {
    this.setState({student:{student_email: event.target.value}});
  }

// Save course and close modal form
  handleAdd = () => {
     this.props.addStudent(this.state.student);
     this.handleClose();
  }

  render()  { 
    return (
        <div>
          <Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
            Add Student
          </Button>
          <Dialog open={this.state.open} onClose={this.handleClose}>
              <DialogTitle>Add Student</DialogTitle>
              <DialogContent  style={{paddingTop: 20}} >
                <TextField autoFocus fullWidth label="Student Name" name="student_name" onChange={this.handleChangeName}  />
                <TextField autoFocus fullWidth label="Student Email" name="student_email" onChange={this.handleChangeEmail}  /> 
              </DialogContent>
              <DialogActions>
                <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                <Button id="Add" color="primary" onClick={this.handleAdd}>Add</Button>
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