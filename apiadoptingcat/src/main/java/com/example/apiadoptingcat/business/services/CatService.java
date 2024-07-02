package com.example.apiadoptingcat.business.services;

import java.util.List;

import com.example.apiadoptingcat.dao.entities.Cat;
import com.example.apiadoptingcat.exceptions.DuplicateCatException;

public interface CatService {
    public List<Cat> getAllCats();
    public Cat getCatById(Long id);
    public Cat addCat(Cat cat ) throws DuplicateCatException;
    public Cat updateCat(Long id,Cat cat) throws DuplicateCatException ;
    public void deleteCat(Long id);    
    public Cat updateCatImage(Long id,String filename);
    
}