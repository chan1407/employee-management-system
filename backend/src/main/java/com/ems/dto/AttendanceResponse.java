package com.ems.dto;

import com.ems.entity.AttendanceStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
public class AttendanceResponse {
    private Long id;
    private Long employeeId;
    private String employeeName;
    private LocalDate attendanceDate;
    private AttendanceStatus status;
    private LocalTime checkIn;
    private LocalTime checkOut;
}