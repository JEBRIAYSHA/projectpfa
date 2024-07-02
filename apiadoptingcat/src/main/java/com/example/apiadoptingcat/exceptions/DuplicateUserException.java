package com.example.apiadoptingcat.exceptions;

public class DuplicateUserException extends Exception {
    public DuplicateUserException(String message){
        super(message);
    }
}