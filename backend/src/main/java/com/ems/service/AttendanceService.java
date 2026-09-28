package com.ems.service;

import com.ems.dto.AttendanceRequest;
import com.ems.dto.AttendanceResponse;
import com.ems.entity.Attendance;
import com.ems.entity.Employee;
import com.ems.exception.ResourceNotFoundException;
import com.ems.repository.AttendanceRepository;
import com.ems.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    public List<AttendanceResponse> getAll() {
        return attendanceRepository.findAllByOrderByAttendanceDateDesc().stream().map(this::toResponse).toList();
    }

    public List<AttendanceResponse> getByEmployee(Long employeeId) {
        requireEmployee(employeeId);
        return attendanceRepository.findByEmployeeIdOrderByAttendanceDateDesc(employeeId).stream().map(this::toResponse).toList();
    }

    public AttendanceResponse save(AttendanceRequest request) {
        Employee employee = requireEmployee(request.getEmployeeId());
        Attendance attendance = attendanceRepository.findByEmployeeIdAndAttendanceDate(request.getEmployeeId(), request.getAttendanceDate())
                .orElseGet(Attendance::new);
        attendance.setEmployee(employee);
        attendance.setAttendanceDate(request.getAttendanceDate());
        attendance.setStatus(request.getStatus());
        attendance.setCheckIn(request.getCheckIn());
        attendance.setCheckOut(request.getCheckOut());
        return toResponse(attendanceRepository.save(attendance));
    }

    public AttendanceResponse update(Long id, AttendanceRequest request) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance not found with id: " + id));
        Employee employee = requireEmployee(request.getEmployeeId());
        attendance.setEmployee(employee);
        attendance.setAttendanceDate(request.getAttendanceDate());
        attendance.setStatus(request.getStatus());
        attendance.setCheckIn(request.getCheckIn());
        attendance.setCheckOut(request.getCheckOut());
        return toResponse(attendanceRepository.save(attendance));
    }

    public void delete(Long id) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance not found with id: " + id));
        attendanceRepository.delete(attendance);
    }

    private Employee requireEmployee(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
    }

    private AttendanceResponse toResponse(Attendance attendance) {
        return new AttendanceResponse(attendance.getId(), attendance.getEmployee().getId(), attendance.getEmployee().getName(),
                attendance.getAttendanceDate(), attendance.getStatus(), attendance.getCheckIn(), attendance.getCheckOut());
    }
}