package com.ems.dto;

import com.ems.entity.AttendanceStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AttendanceRequest {
    @NotNull(message = "Employee is required")
    private Long employeeId;
    @NotNull(message = "Attendance date is required")
    private LocalDate attendanceDate;
    @NotNull(message = "Attendance status is required")
    private AttendanceStatus status;
    private LocalTime checkIn;
    private LocalTime checkOut;
}