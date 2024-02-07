import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import { useEffect, useState } from "react";

const CreateEmployeeComponent =() => {
    let {id} = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState({
        id: id,
        firstName: '',
        lastName: '',
        emailId: ''
      });
  
useEffect( () => {
   
  
    if(state.id > 0){
        console.log('id:'+state.id);
        EmployeeService.getEmployeeById(state.id).then( (res) => {
           let employee = res.data;
           setState({...state,
             firstName: employee.firstName,
             lastName: employee.lastName,
             emailId: employee.emailId
           });
        } );
    
    }
  
  
},[])

const saveEmployee=(e)=>{
   
    e.preventDefault();
    let employee={firstName:state.firstName,lastName:state.lastName,emailId:state.emailId};
    console.log('employee => '+JSON.stringify(employee));
    console.log('id:'+state.id);
    if(state.id == -1){
        EmployeeService.createEmployee(employee).then((res)=>{
            navigate("/employees");
        });
        
    }else{
        EmployeeService.updateEmployee(employee, state.id).then((res) => {
             navigate("/employees");
        });
    }

   
}
const changeFirstNameHandler=(event)=>{
    setState({...state, firstName: event.target.value});
}
const changeLastNameHandler=(event)=>{
    setState({...state, lastName: event.target.value});
}
const changeEmailIdHandler=(event)=>{
    setState({...state, emailId: event.target.value});
}

const cancel=(e)=>{
    navigate("/employees");
}

function getTitle(){
    if(state.id == -1){
        return <h3 className='text-center'>Add an Employee</h3>
    }
    else{
        return <h3 className='text-center'>Update Employee</h3>
    }
}
   
        return (
            <div>
                 <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div>Employee Management Application</div>
                    </nav>
                </header>
            </div>
                <h1>Employee Form</h1>
                <div className="contaier">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offsest-md-3">
                           {
                            getTitle()
                           }
                            <div className="card-body">
                                <form>
                                 <div className="form-group">
                                    <label htmlFor="">First Name:</label>
                                    <input placeholder="First Name" name="firstname" className="form-control"
                                    value={state.firstName || ""} onChange={changeFirstNameHandler}/>
                                 </div>
                                 <div className="form-group">
                                    <label htmlFor="">Last Name:</label>
                                    <input placeholder="Last Name" name="lastname" className="form-control"
                                    value={state.lastName || ""} onChange={changeLastNameHandler}/>
                                 </div>
                                 <div className="form-group">
                                    <label htmlFor="">Email Id:</label>
                                    <input placeholder="Email Id" name="emailId" className="form-control"
                                    value={state.emailId || ""} onChange={changeEmailIdHandler}/>
                                 </div><br />
                                 
                                 <button className="btn btn-success" onClick={saveEmployee}>Save</button>
                                 <button className="btn btn-danger" onClick={cancel} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                <footer className="footer">
                    <span className="text-muted">All Rights Reserved 2023</span>
                </footer>
            </div>
            </div>
           
        );
    }


export default CreateEmployeeComponent;