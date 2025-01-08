package com.starter.springboot_starter.model;

import jakarta.persistence.Id;

public class Email {

    private String email;
    private String verificationCode;

    public Email(String email, String verificationCode) {
        this.email = email;
        this.verificationCode = verificationCode;
    }
    public Email() {
    }

    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public String getVerificationCode(){
        return verificationCode;
    }
    public void setVerificationCode(String verificationCode){
        this.verificationCode = verificationCode;
    }

}
