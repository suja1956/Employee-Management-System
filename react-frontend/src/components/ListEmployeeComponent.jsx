import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import axios from "axios";
const ListEmployeeComponent =() => {

    const navigate = useNavigate();
    const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showSearchResults,setShowSearchResults] = useState(false)
  const handleChange = async (value) => {
    setInput(value);
    if (value.length >= 1) {
      setShowSearchResults(true)
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/employees/search?keyword=${value}`
      );
      setSearchResults(response.data);
      setNoResults(response.data.length === 0);
      console.log(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
};
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
                        <input
                    className="form-control me-4"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                    onFocus={() => setSearchFocused(true)} // Set searchFocused to true when search bar is focused
                    onBlur={() => setSearchFocused(false)} // Set searchFocused to false when search bar loses focus
                    style={{ width: '250px' , marginLeft: 'auto'}}
                    />
               
                    </nav>
                </header>
                {showSearchResults && (
                  <ul className="list-group">
                    {searchResults.length > 0 ? (  
                        searchResults.map((result) => (
                          <li key={result.id} className="list-group-item">
                            <a href={`/view-employee/${result.id}`} className="search-result-link">
                            <span>{result.firstName + " " + result.lastName}</span>
                            </a>
                          </li>
                        ))
                    ) : (
                      noResults && (
                        <p className="no-results-message">
                          No Employee with such Name or email
                        </p>
                      )
                    )}
                  </ul>
                )}
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