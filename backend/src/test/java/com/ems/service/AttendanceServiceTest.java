package com.ems.service;

import com.ems.dto.AttendanceRequest;
import com.ems.entity.Attendance;
import com.ems.entity.AttendanceStatus;
import com.ems.entity.Employee;
import com.ems.repository.AttendanceRepository;
import com.ems.repository.EmployeeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AttendanceServiceTest {
    @Mock AttendanceRepository attendanceRepository;
    @Mock EmployeeRepository employeeRepository;
    @InjectMocks AttendanceService attendanceService;

    @Test
    void saveUpdatesExistingEmployeeDateRecord() {
        Employee employee = new Employee(); employee.setId(7L); employee.setName("Asha");
        Attendance existing = new Attendance(); existing.setId(3L); existing.setEmployee(employee);
        AttendanceRequest request = new AttendanceRequest(); request.setEmployeeId(7L); request.setAttendanceDate(LocalDate.of(2026, 9, 28)); request.setStatus(AttendanceStatus.PRESENT);
        when(employeeRepository.findById(7L)).thenReturn(Optional.of(employee));
        when(attendanceRepository.findByEmployeeIdAndAttendanceDate(7L, request.getAttendanceDate())).thenReturn(Optional.of(existing));
        when(attendanceRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));

        var response = attendanceService.save(request);

        assertEquals(3L, response.getId());
        assertEquals(AttendanceStatus.PRESENT, response.getStatus());
        verify(attendanceRepository).save(existing);
    }
}