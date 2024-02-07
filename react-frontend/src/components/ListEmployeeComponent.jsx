import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const ListEmployeeComponent =() => {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
        useEffect(() => {
            {
                EmployeeService.getEmployee().then((res) =>{
                    setEmployees(res.data);
                } );
            }
        },[])

        const editEmployee = (id) => {
            navigate(`/add-employee/${id}`);
        }
        const viewEmployee = (id) => {
            navigate(`/view-employee/${id}`);
        }
        const deleteEmployee = (id) => {
            EmployeeService.deleteEmployee(id).then(res =>{
                //setEmployees({employees: employees.filter(employee => employee.id !== id)});
               window.location.reload();
            });
        }
        const addEmployee = () => {
            navigate('/add-employee/-1');
        }

        return (
            
            <div>
                
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div>Employee Management Application</div>
                    </nav>
                </header>
               
                <h2 className="text-center">Employees List</h2>
                <div className="">
                <button className="btn btn-primary" onClick={addEmployee}>Add Employee</button>
                </div>
                 <div className="">
                   <table className="table table-striped table-bordered">
                    <thead>

                    <tr>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee EmailId</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map(
                               employee=>
                                <tr key={employee.id}>
                                   <td>{employee.firstName}</td>
                                   <td>{employee.lastName}</td>
                                   <td>{employee.emailId}</td>
                                   <td>
                                    <button onClick={() => { editEmployee(employee.id) }} className="btn btn-info">Update</button>
                                    <button style={{marginLeft: "15px"}} onClick={() => { deleteEmployee(employee.id) }} className="btn btn-danger">Delete</button>
                                    <button style={{marginLeft: "15px"}} onClick={() => { viewEmployee(employee.id) }} className="btn btn-success">View</button>
                                   </td>
                                </tr>
                            )

                        }

                    </tbody>
                   </table>

                 </div>
            
                <footer className="footer">
                    <span className="text-muted">All Rights Reserved 2023</span>
                </footer>
            
            </div>
        );
}

export default ListEmployeeComponent;