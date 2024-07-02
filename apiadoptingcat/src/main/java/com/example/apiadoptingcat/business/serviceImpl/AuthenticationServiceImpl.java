package com.example.apiadoptingcat.business.serviceImpl;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.example.apiadoptingcat.exceptions.DuplicateUserException;
import com.example.apiadoptingcat.business.services.AuthenticationService;
import com.example.apiadoptingcat.dao.entities.User;
import com.example.apiadoptingcat.dao.repositories.UserRepository;
import com.example.apiadoptingcat.web.dto.AuthenticationUserDTO;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    // Repository to handle User entity persistence
    private final UserRepository userRepository;

    // Constructor injection for UserRepository
    public AuthenticationServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User register(User user) throws DuplicateUserException {
        if (user == null) {
            return null;
        }
        try {
            // Save the user in the repository
            return userRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            // Handle uniqueness constraint violations
            throw new DuplicateUserException("User already exists");
        }
    }

    @Override
    public AuthenticationUserDTO login(Authentication authentication) {
        // Retrieve the user principal from the authentication object after basic authentication
        User user = (User) authentication.getPrincipal();
        // Convert the User entity to AuthenticationUserDTO and return it
        return AuthenticationUserDTO.toAuthenticationUserDTO(user);
    }
}