import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import Grid from '@mui/material/Grid';
import {DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddStudent from './AddStudent';


class Studt extends Component {
  constructor(props) {
    super(props);
    this.state = { student: { } };
  } 
  /*
  componentDidMount() {
    this.fetchCourses();
  }
  */
  

  // Add student
  addStudent = (student) => {
    const token = Cookies.get('XSRF-TOKEN');
 
    fetch(`${SERVER_URL}/student`,
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
          this.fetchCourses();
        } else {
          toast.error("Error when adding student code 1", {
              position: toast.POSITION.BOTTOM_LEFT
          });
          console.error('Post http status =' + res.status);
        }})
    .catch(err => {
      toast.error("Error when adding student code 2", {
            position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err);
    })
  } 
  

  render() {
     
  
  return(
    <div>
    <AppBar position="static" color="default">
       <Toolbar>
          <Typography variant="h6" color="inherit">
             Schedule - select a term
          </Typography>
       </Toolbar>
    </AppBar>
    <div align="left" >
      <div style={{width:'100%'}}>
        For DEBUG:  display state.
        {JSON.stringify(this.state)}
      </div>
      <Grid container>
        <Grid item>
          <ButtonGroup>
            <AddStudent addStudent={this.addStudent}  />
          </ButtonGroup>
        </Grid>
      </Grid>
      <ToastContainer autoClose={1500} />   
    </div>
                
        
        
    </div>

      ); 
  }
}

export default Studt;