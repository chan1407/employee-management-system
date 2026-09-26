package com.ems.security;

import com.ems.entity.Admin;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collections;

public class AdminUserDetails extends User {

    public AdminUserDetails(Admin admin) {
        super(admin.getEmail(), admin.getPassword(), Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_" + admin.getRole())
        ));
    }
}
