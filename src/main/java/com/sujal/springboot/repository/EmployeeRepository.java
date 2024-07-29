package com.sujal.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sujal.springboot.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>{

    @Query("SELECT e FROM Employee e WHERE " + 
    "LOWER(e.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
    "LOWER(e.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
    "LOWER(e.emailId) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Employee> searchEmployees(String keyword);
}
