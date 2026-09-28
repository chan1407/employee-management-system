package com.ems.controller;

import com.ems.dto.DepartmentRequest;
import com.ems.entity.Department;
import com.ems.service.DepartmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
public class DepartmentController {
    private final DepartmentService departmentService;

    @GetMapping public List<Department> getAll() { return departmentService.getAll(); }
    @GetMapping("/{id}") public Department getById(@PathVariable Long id) { return departmentService.getById(id); }
    @PostMapping public ResponseEntity<Department> create(@Valid @RequestBody DepartmentRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(departmentService.create(request));
    }
    @PutMapping("/{id}") public Department update(@PathVariable Long id, @Valid @RequestBody DepartmentRequest request) {
        return departmentService.update(id, request);
    }
    @DeleteMapping("/{id}") public Map<String, String> delete(@PathVariable Long id) {
        departmentService.delete(id);
        return Map.of("message", "Department deleted successfully");
    }
}