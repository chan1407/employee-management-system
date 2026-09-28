package com.ems.repository;

import com.ems.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(String email);

    List<Employee> findByDepartmentEntityId(Long departmentId);

    List<Employee> findByRoleEntityId(Long roleId);

    @Query("SELECT e FROM Employee e WHERE " +
            "(:search IS NULL OR :search = '' OR LOWER(e.name) LIKE LOWER(CONCAT('%', :search, '%')) OR CAST(e.id AS string) = :search) " +
            "AND (:department IS NULL OR :department = '' OR e.department = :department)")
    List<Employee> searchAndFilter(@Param("search") String search, @Param("department") String department);
}
