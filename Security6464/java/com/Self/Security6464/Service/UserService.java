package com.Self.Security6464.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Self.Security6464.Entity.LoginDetails;
import com.Self.Security6464.Entity.UserDetails;
import com.Self.Security6464.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    public PasswordEncoder passwordEncoder;

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public AuthenticationManager authenticationManager;

    @Autowired
    public JwtService jwtService;

    public UserDetails SaveData(UserDetails u) {

        UserDetails u1 = new UserDetails();

        u1.setMobile(u.getMobile());
        u1.setFullName(u.getFullName());
        u1.setEmail(u.getEmail());

        u1.setPassword(passwordEncoder.encode(u.getPassword()));

        u1.setRole("USER");

        return userRepository.save(u1);
    }

    public UserDetails LoginData(LoginDetails l) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        l.getMobile(),
                        l.getPassword()
                )
        );

        if (authentication.isAuthenticated()) {
            return userRepository.findBymobile(l.getMobile());
        }

        return null;
    }

    public String generateToken(String mobile) {

        return jwtService.generateToken(mobile);
    }
}