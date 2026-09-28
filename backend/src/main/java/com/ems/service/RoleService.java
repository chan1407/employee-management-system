package com.ems.service;

import com.ems.dto.RoleRequest;
import com.ems.entity.Role;
import com.ems.exception.ResourceNotFoundException;
import com.ems.repository.EmployeeRepository;
import com.ems.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;
    private final EmployeeRepository employeeRepository;

    public List<Role> getAll() { return roleRepository.findAll(); }

    public Role getById(Long id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id: " + id));
    }

    public Role create(RoleRequest request) {
        roleRepository.findByNameIgnoreCase(request.getName()).ifPresent(existing -> {
            throw new DataIntegrityViolationException("A role with this name already exists");
        });
        Role role = new Role();
        role.setName(request.getName().trim());
        role.setDescription(request.getDescription());
        return roleRepository.save(role);
    }

    public Role update(Long id, RoleRequest request) {
        Role role = getById(id);
        roleRepository.findByNameIgnoreCase(request.getName()).ifPresent(existing -> {
            if (!existing.getId().equals(id)) throw new DataIntegrityViolationException("A role with this name already exists");
        });
        role.setName(request.getName().trim());
        role.setDescription(request.getDescription());
        employeeRepository.findByRoleEntityId(id).forEach(employee -> employee.setRole(role.getName()));
        return roleRepository.save(role);
    }

    public void delete(Long id) {
        Role role = getById(id);
        employeeRepository.findByRoleEntityId(id).forEach(employee -> {
            employee.setRoleEntity(null);
            employeeRepository.save(employee);
        });
        roleRepository.delete(role);
    }
}