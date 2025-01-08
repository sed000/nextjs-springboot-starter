package com.starter.springboot_starter.service;

import com.resend.*;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import com.starter.springboot_starter.model.User;
import com.starter.springboot_starter.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@Service
public class EmailService {
    private final UserRepository userRepository;
    @Value("${resendKey}")
    private String resendKey;
    Resend resend;
    public EmailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @PostConstruct
    public void init() {
        resend = new Resend(resendKey);
    }
    public void sendEmail(String userEmail) throws ResendException {
        String verificationCode = generateVerificationCode();
        User user = userRepository.findByEmail(userEmail);
        updateVerificationCode(user.getId(), verificationCode);
        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("onboarding@resend.dev")
                .to(user.getEmail())
                .subject("Verification Code")
                .html("<p>" + verificationCode + "</p>")
                .build();
        try {
            CreateEmailResponse data = resend.emails().send(params);
        } catch (ResendException e) {
            throw new RuntimeException(e);
        }
    }

    private String generateVerificationCode() {
        Random random = new Random();
        int code = 1000 + random.nextInt(9000); // Generates a number between 1000 and 9999
        return String.valueOf(code);
    }

    @Transactional
    public String verifyCode(String email, String code) {
        User user = userRepository.findByEmail(email);
        if (user.getVerificationCode().equals(code)) {
            user.setVerified(true);
            userRepository.save(user);
        } else {
            System.out.println("Wrong verification code");
        }
        return code;
    }

    @Transactional
    public void updateVerificationCode(String userId, String updateCode) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User with id " + userId + " not found"));
        user.setVerificationCode(updateCode);
        userRepository.save(user);
    }

}
