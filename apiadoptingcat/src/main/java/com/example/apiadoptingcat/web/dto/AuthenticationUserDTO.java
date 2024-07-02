package com.example.apiadoptingcat.web.dto;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.example.apiadoptingcat.dao.entities.User;

public record AuthenticationUserDTO(
        Long id,
        String email,
        List<String> roles) {
            
    public static AuthenticationUserDTO toAuthenticationUserDTO(User user) {
        List<String> roles = user.getRole().getAuthorities()
                .stream()
                .map(SimpleGrantedAuthority::getAuthority)
                .toList();

        return new AuthenticationUserDTO(user.getId(), user.getEmail(), roles);
        
        // avec buider
//    return AuthenticationUserDTO;
    
    
    }
}