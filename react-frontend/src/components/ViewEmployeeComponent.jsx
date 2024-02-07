import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const ViewEmployeeComponent = () => {
    let {id} = useParams();
    const [state, setState] = useState({
        id: id,
        employee: {}
      });
    
      useEffect( () => {
      EmployeeService.getEmployeeById(state.id).then(res =>{
        setState({employee: res.data});
      });
    },[])
    return (
        <div>
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div>Employee Management Application</div>
            </nav>
        </header>
    
        <div>
            <div className="card col-md-6 offset-md-3">
             <h3 className="text-center">View Employee Detail</h3>
             <div className="card-body">
                <div className="row">
                 <label> Employee First Name: </label>
                 <div>{ state.employee.firstName}</div>
                </div>
                <div className="row">
                 <label> Employee Last Name: </label>
                 <div>{ state.employee.lastName}</div>
                </div>
                <div className="row">
                 <label> Employee EmailId: </label>
                 <div>{ state.employee.emailId}</div>
                </div>
             </div>
            </div>
        </div>
        <footer className="footer">
                    <span className="text-muted">All Rights Reserved 2023</span>
                </footer>
        </div>
    );
}
export default ViewEmployeeComponent;