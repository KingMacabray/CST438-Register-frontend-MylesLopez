import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import {SEMESTER_LIST, SERVER_URL} from '../constants.js'
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
      this.state = {open: false, stud:[] };
    }
    
    //componentDidMount() {
    //    this.fetchStudents();
    //  }

    addStudent = ( ) => {
        console.log("Student.handleSubmit");
        const token = Cookies.get('XSRF-TOKEN');
        
        fetch(`${SERVER_URL}/student` , 
            {  
              method: 'POST', 
              headers: { 'Content-Type': 'application/json',
                         'X-XSRF-TOKEN': token }, 
              body: JSON.stringify(this.state.irows.name, this.state.irows.email)
            } )
        .then(res => {
            if (res.ok) {
              toast.success("Student successfully added", {
              position: toast.POSITION.BOTTOM_LEFT
              });
              this.fetchGrades();
            } else {
              toast.error("Student addition failed", {
              position: toast.POSITION.BOTTOM_LEFT
              });
              console.error('Put http status =' + res.status);
        }})
          .catch(err => {
            toast.error("Student addition failed", {
              position: toast.POSITION.BOTTOM_LEFT
            });
            console.error(err);
          });
     };  


    render()  { 
        const icolumns = [
            { field: 'name', headerName: 'Name', width: 300, editable:true},
            { field: 'email', headerName: 'Email', width: 300 , editable:true},
        ];
        const irows = [{id:0, name:' name here ', email:' email here '}];
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
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={irows} columns={icolumns} />
                    <Button id="AddStudent" variant="outlined" color="primary" style={{margin: 10}} onClick={this.addStudent} >
                   Add Student
                </Button>
                </div>      
            </div>
        ); 
      }

}

Student.propTypes = {
    addStudent : PropTypes.func.isRequired
  }

export default Student;
