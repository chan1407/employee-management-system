package com.ems.service;

import com.ems.dto.DashboardResponse;
import com.ems.dto.EmployeeRequest;
import com.ems.entity.Employee;
import com.ems.entity.Department;
import com.ems.entity.Role;
import com.ems.exception.DuplicateEmailException;
import com.ems.exception.ResourceNotFoundException;
import com.ems.repository.EmployeeRepository;
import com.ems.repository.DepartmentRepository;
import com.ems.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final RoleRepository roleRepository;

    public List<Employee> getAll(String search, String department) {
        return employeeRepository.searchAndFilter(search, department);
    }

    public Employee getById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
    }

    public Employee create(EmployeeRequest request) {
        employeeRepository.findByEmail(request.getEmail()).ifPresent(e -> {
            throw new DuplicateEmailException("An employee with this email already exists");
        });

        Employee employee = mapToEntity(request, new Employee());
        return employeeRepository.save(employee);
    }

    public Employee update(Long id, EmployeeRequest request) {
        Employee employee = getById(id);

        employeeRepository.findByEmail(request.getEmail()).ifPresent(existing -> {
            if (!existing.getId().equals(id)) {
                throw new DuplicateEmailException("An employee with this email already exists");
            }
        });

        mapToEntity(request, employee);
        return employeeRepository.save(employee);
    }

    public void delete(Long id) {
        Employee employee = getById(id);
        employeeRepository.delete(employee);
    }

    public DashboardResponse getDashboardSummary() {
        List<Employee> all = employeeRepository.findAll();

        long totalDepartments = all.stream()
                .map(Employee::getDepartment)
                .distinct()
                .count();

        List<Employee> recent = all.stream()
                .sorted(Comparator.comparing(Employee::getId).reversed())
                .limit(5)
                .collect(Collectors.toList());

        return new DashboardResponse(all.size(), totalDepartments, recent);
    }

    private Employee mapToEntity(EmployeeRequest request, Employee employee) {
        employee.setName(request.getName());
        employee.setEmail(request.getEmail());
        employee.setPhone(request.getPhone());
        employee.setDepartment(request.getDepartment());
        employee.setRole(request.getRole());
        if (request.getDepartmentId() != null) {
            Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with id: " + request.getDepartmentId()));
            employee.setDepartmentEntity(department);
            employee.setDepartment(department.getName());
        } else {
            employee.setDepartmentEntity(null);
        }
        if (request.getRoleId() != null) {
            Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id: " + request.getRoleId()));
            employee.setRoleEntity(role);
            employee.setRole(role.getName());
        } else {
            employee.setRoleEntity(null);
        }
        employee.setJoiningDate(request.getJoiningDate());
        employee.setSalary(request.getSalary());
        employee.setAddress(request.getAddress());
        return employee;
    }
}
