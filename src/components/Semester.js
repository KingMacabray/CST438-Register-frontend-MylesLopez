import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import {DataGrid} from '@mui/x-data-grid';
import {SEMESTER_LIST} from '../constants.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import ButtonGroup from '@mui/material/ButtonGroup';
import AddStudent from './AddStudent';

// user selects from a list of  (year, semester) values
class Semester extends Component {
    constructor(props) {
      super(props);
      this.state = {selected: SEMESTER_LIST.length-1, student: { } };
    }
 
   onRadioClick = (event) => {
    console.log("Semester.onRadioClick "+JSON.stringify(event.target.value));
    this.setState({selected: event.target.value});
  }
  

    // Add student function
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
            // Code 1 & 2 for debugging purposes
          } else {
            toast.error("Error when adding student - code 1", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            console.error('Post http status =' + res.status);
          }})
      .catch(err => {
        toast.error("Error when adding student - code 2", {
              position: toast.POSITION.BOTTOM_LEFT
          });
          console.error(err);
      })
    } 


  render() {    
      const icolumns = [
      {
        field: 'id',
        headerName: 'Year',
        width: 200,
        renderCell: (params) => (
          <div>
            <Radio
              checked={params.row.id === this.state.selected}
              onChange={this.onRadioClick}
              value={params.row.id}
              color="default"
              size="small"
            />
            { SEMESTER_LIST[params.row.id].year }
          </div>
        )
      },
      { field: 'name', headerName: 'Semester', width: 200 }
      ];       
       
    return (
       <div>
         <AppBar position="static" color="default">
            <Toolbar>
               <Typography variant="h6" color="inherit">
                  Schedule - select a term
               </Typography>
            </Toolbar>
         </AppBar>
         <div align="left" >
              <div style={{ height: 400, width: '100%', align:"left"   }}>
                <DataGrid   rows={SEMESTER_LIST} columns={icolumns} />
              </div>                
              <Button id = 'selectTerm' component={Link} 
                      to={{pathname:'/schedule' , 
                      year:SEMESTER_LIST[this.state.selected].year, 
                      semester:SEMESTER_LIST[this.state.selected].name}} 
                variant="outlined" color="primary" style={{margin: 10}}>
                Get Schedule
              </Button>
              <Button id='toStudt' component={Link} 
                      to={{pathname:'/student'}} 
                variant="outlined" color="primary" style={{margin: 10}}>
                Student Page
              </Button>
              <ButtonGroup id='semesterAddStud'>
                <AddStudent addStudent={this.addStudent}  />
              </ButtonGroup>
              <ToastContainer autoClose={1500} />
          </div>
      </div>
    )
  }
}
export default Semester;