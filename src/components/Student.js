import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import {SERVER_URL} from '../constants.js'
import Grid from '@mui/material/Grid';
import {DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

//String name = "";
//String 
class Student extends Component {
    constructor(props) {
      super(props);
      this.state = {open: false, stud:{ } };
    }

    handleClickOpen = () => {
        this.setState( {open:true} );
      };
  
      handleClose = () => {
        this.setState( {open:false} );
      };
  
      handleChange = (event) => {
        this.setState({student:{student_id: event.target.value}});
      }
  
    // Save student and close modal form
      handleAdd = () => {
         this.props.addStudent(this.state.student);
         this.handleClose();
      }

        // Add student
  addStudent = (student) => {
    const token = Cookies.get('XSRF-TOKEN');
 
    fetch(`${SERVER_URL}/schedule`,
      { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json',
                   'X-XSRF-TOKEN': token  }, 
        body: JSON.stringify(student)
      })
    .then(res => {
        if (res.ok) {
          toast.success("Student successfully added", {
              position: toast.POSITION.BOTTOM_LEFT
          });
          this.fetchStudents();
        } else {
          toast.error("Error when adding", {
              position: toast.POSITION.BOTTOM_LEFT
          });
          console.error('Post http status =' + res.status);
        }})
    .catch(err => {
      toast.error("Error when adding", {
            position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err);
    })
  } 



    render()  { 
        {
            field: 'id',
            headerName: '  ',
            sortable: false,
            width: 200,
            renderCell: (params) => (
            <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{ marginLeft: 16 }} 
                onClick={()=>{this.onDelClick(params.value)}}
            >
                Add Student
            </Button>
            //)
          }
        return (
            <div>
              <Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
                Add Student
              </Button>
              <Dialog open={this.state.open} onClose={this.handleClose}>
                  <DialogTitle>Add Student</DialogTitle>
                  <DialogContent  style={{paddingTop: 20}} >
                    <TextField autoFocus fullWidth label="Student Id" name="student_id" onChange={this.handleChange}  /> 
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

Student.propTypes = {
    addStudent : PropTypes.func.isRequired
  }

export default Student;
