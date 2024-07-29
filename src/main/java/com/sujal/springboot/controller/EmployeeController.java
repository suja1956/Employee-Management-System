package com.sujal.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sujal.springboot.exception.ResourceNotFoundException;
import com.sujal.springboot.model.Employee;
import com.sujal.springboot.repository.EmployeeRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {
	
    @Autowired
	private EmployeeRepository employeeRepository;
    
    //get all employees
    @GetMapping("/employees")
    public List<Employee> getAllEmployees(){
    	return employeeRepository.findAll();
    }
    
    //create employee rest api
    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee) {
    	return employeeRepository.save(employee);
    }
    
    //get emp by id rest api
    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") Long id) {
    	Employee employee = employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee do not exist with Id:"+id));
    	return ResponseEntity.ok(employee);
    }
    
    //update emp rest api
    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id,@RequestBody Employee employeeDetail){
    	//bring details of employee to be updated
    	Employee employee = employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee do not exist with Id:"+id));
    	
    	//udate values of employee to be updated
    	employee.setFirstName(employeeDetail.getFirstName());
    	employee.setLastName(employeeDetail.getLastName());
    	employee.setEmailId(employeeDetail.getEmailId());
    	 
    	//save employee to db
    	employeeRepository.save(employee);
    	return ResponseEntity.ok(employee);
    }
    
    //delete emp rest api
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable Long id){
    	
    	Employee employee = employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee do not exist with Id:"+id));
    	employeeRepository.delete(employee);
    	
    	Map<String,Boolean> response = new HashMap<>();
    	response.put("Deleted", Boolean.TRUE);
    	return ResponseEntity.ok(response);
    }

    @GetMapping("/employees/search")
    public ResponseEntity<List<Employee>> searchEmployee(@RequestParam String keyword) {
        List<Employee> emps = employeeRepository.searchEmployees(keyword);
        return new ResponseEntity<List<Employee>>(emps, HttpStatus.OK);
    }
    
}
