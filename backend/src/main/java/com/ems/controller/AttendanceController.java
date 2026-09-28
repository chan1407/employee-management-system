package com.ems.controller;

import com.ems.dto.AttendanceRequest;
import com.ems.dto.AttendanceResponse;
import com.ems.service.AttendanceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {
    private final AttendanceService attendanceService;

    @GetMapping public List<AttendanceResponse> getAll() { return attendanceService.getAll(); }
    @GetMapping("/employee/{employeeId}") public List<AttendanceResponse> getByEmployee(@PathVariable Long employeeId) {
        return attendanceService.getByEmployee(employeeId);
    }
    @PostMapping public AttendanceResponse save(@Valid @RequestBody AttendanceRequest request) {
        return attendanceService.save(request);
    }
    @PutMapping("/{id}") public AttendanceResponse update(@PathVariable Long id, @Valid @RequestBody AttendanceRequest request) {
        return attendanceService.update(id, request);
    }
    @DeleteMapping("/{id}") public Map<String, String> delete(@PathVariable Long id) {
        attendanceService.delete(id);
        return Map.of("message", "Attendance deleted successfully");
    }
}