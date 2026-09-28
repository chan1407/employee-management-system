package com.ems.repository;

import com.ems.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.EntityGraph;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    @EntityGraph(attributePaths = "employee")
    List<Attendance> findAllByOrderByAttendanceDateDesc();

    @EntityGraph(attributePaths = "employee")
    List<Attendance> findByEmployeeIdOrderByAttendanceDateDesc(Long employeeId);
    Optional<Attendance> findByEmployeeIdAndAttendanceDate(Long employeeId, LocalDate attendanceDate);
}