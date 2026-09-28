package com.ems.service;

import com.ems.dto.DepartmentRequest;
import com.ems.entity.Department;
import com.ems.exception.ResourceNotFoundException;
import com.ems.repository.DepartmentRepository;
import com.ems.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentService {
    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;

    public List<Department> getAll() { return departmentRepository.findAll(); }

    public Department getById(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + id));
    }

    public Department create(DepartmentRequest request) {
        departmentRepository.findByNameIgnoreCase(request.getName()).ifPresent(existing -> {
            throw new DataIntegrityViolationException("A department with this name already exists");
        });
        Department department = new Department();
        department.setName(request.getName().trim());
        department.setDescription(request.getDescription());
        return departmentRepository.save(department);
    }

    public Department update(Long id, DepartmentRequest request) {
        Department department = getById(id);
        departmentRepository.findByNameIgnoreCase(request.getName()).ifPresent(existing -> {
            if (!existing.getId().equals(id)) throw new DataIntegrityViolationException("A department with this name already exists");
        });
        department.setName(request.getName().trim());
        department.setDescription(request.getDescription());
        employeeRepository.findByDepartmentEntityId(id).forEach(employee -> employee.setDepartment(department.getName()));
        return departmentRepository.save(department);
    }

    public void delete(Long id) {
        Department department = getById(id);
        employeeRepository.findByDepartmentEntityId(id).forEach(employee -> {
            employee.setDepartmentEntity(null);
            employeeRepository.save(employee);
        });
        departmentRepository.delete(department);
    }
}