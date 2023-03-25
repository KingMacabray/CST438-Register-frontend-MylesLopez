
/*
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
*/

import Button from '@mui/material/Button';
import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

// properties addStudent is required, function called when Add clicked.
class AddStudent extends Component {
    constructor(props) {
    super(props);
    this.state = {open: false, student_name:"didnt", student_email:"work" };
  };
  
  handleClickOpen = () => {
    this.setState( {open:true} );
  };

  handleClose = () => {
    this.setState( {open:false} );
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }
  /*
  handleChangeName = (nameEvent) => {
    this.setState({student_name: nameEvent.target.value});
  }

  handleChangeEmail = (emailEvent) => {
    this.setState({student_email: emailEvent.target.value});
  }
  */
// Save course and close modal form
  handleAdd = () => {
     this.props.addStudent({student_name: this.state.student_name, student_email: this.state.student_email});
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
                <TextField autoFocus fullWidth label="Student Name" name="student_name" onChange={this.handleChange}  />
                <br/>
                <TextField autoFocus fullWidth label="Student Email" name="student_email" onChange={this.handleChange}  /> 
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