package com.example.apiadoptingcat.business.services;


import org.springframework.security.core.Authentication;
import com.example.apiadoptingcat.dao.entities.User;
import com.example.apiadoptingcat.exceptions.DuplicateUserException;
import com.example.apiadoptingcat.web.dto.AuthenticationUserDTO;

public interface AuthenticationService {
   
    User register(User user) throws DuplicateUserException;
   AuthenticationUserDTO login(Authentication authentication);
}