package com.Self.Security6464.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Self.Security6464.Entity.LoginDetails;
import com.Self.Security6464.Entity.UserDetails;
import com.Self.Security6464.Service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class RegisterController {

    @Autowired
    private UserService userService;

    // REGISTER API
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDetails user) {

        Map<String, Object> response = new HashMap<>();

        try {

            UserDetails savedUser = userService.SaveData(user);

            response.put("message", "Registration successful");
            response.put("email", savedUser.getEmail());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (DataIntegrityViolationException e) {

            response.put("message", "This email or mobile number already registered. Please use another email or sign in.");

            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    // LOGIN API
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDetails login) {

        try {

            UserDetails user = userService.LoginData(login);

            String token = userService.generateToken(user.getMobile());

            Map<String, Object> userData = new HashMap<>();

            userData.put("userId", user.getId());
            userData.put("fullName", user.getFullName());
            userData.put("mobile", user.getMobile());
            userData.put("email", user.getEmail());
            userData.put("role", user.getRole());

            Map<String, Object> response = new HashMap<>();

            response.put("message", "Login successful");
            response.put("token", token);
            response.put("user", userData);

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            Map<String, Object> response = new HashMap<>();

            response.put("message", "Invalid mobile number or password");

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }
    }
}