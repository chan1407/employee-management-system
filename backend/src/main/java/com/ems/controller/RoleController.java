package com.ems.controller;

import com.ems.dto.RoleRequest;
import com.ems.entity.Role;
import com.ems.service.RoleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {
    private final RoleService roleService;

    @GetMapping public List<Role> getAll() { return roleService.getAll(); }
    @GetMapping("/{id}") public Role getById(@PathVariable Long id) { return roleService.getById(id); }
    @PostMapping public ResponseEntity<Role> create(@Valid @RequestBody RoleRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(roleService.create(request));
    }
    @PutMapping("/{id}") public Role update(@PathVariable Long id, @Valid @RequestBody RoleRequest request) {
        return roleService.update(id, request);
    }
    @DeleteMapping("/{id}") public Map<String, String> delete(@PathVariable Long id) {
        roleService.delete(id);
        return Map.of("message", "Role deleted successfully");
    }
}