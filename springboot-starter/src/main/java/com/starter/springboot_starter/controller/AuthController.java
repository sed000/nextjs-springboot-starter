package com.starter.springboot_starter.controller;

import com.resend.core.exception.ResendException;
import com.starter.springboot_starter.model.Email;
import com.starter.springboot_starter.model.User;
import com.starter.springboot_starter.service.EmailService;
import com.starter.springboot_starter.service.UserService;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/auth")
@RestController
public class AuthController {
    private final UserService userService;
    private final EmailService emailService;
    public AuthController(UserService userService, EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        return userService.verify(user);
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) throws ResendException {
        userService.register(user);
        emailService.sendEmail(user.getEmail());
        return user;
    }

    @PostMapping("/verification")
    public void verifyCode(@RequestBody Email email) throws ResendException {
        emailService.verifyCode(email.getEmail(), email.getVerificationCode());
    }



}
