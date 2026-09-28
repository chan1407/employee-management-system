package com.ems.controller;

import com.ems.entity.Department;
import com.ems.service.DepartmentService;
import com.ems.security.JwtUtil;
import com.ems.security.AdminUserDetailsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(DepartmentController.class)
@AutoConfigureMockMvc(addFilters = false)
class DepartmentControllerTest {
    @Autowired MockMvc mockMvc;
    @MockBean DepartmentService departmentService;
    @MockBean JwtUtil jwtUtil;
    @MockBean AdminUserDetailsService adminUserDetailsService;

    @Test
    void getAllReturnsDepartments() throws Exception {
        Department department = new Department(1L, "Engineering", "Builds products");
        when(departmentService.getAll()).thenReturn(List.of(department));

        mockMvc.perform(get("/api/departments"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Engineering"));
    }
}