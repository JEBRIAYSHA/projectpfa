package com.example.apiadoptingcat.dao.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.apiadoptingcat.dao.entities.Cat;

public interface CatRepository extends JpaRepository<Cat, Long >{

    
    
}