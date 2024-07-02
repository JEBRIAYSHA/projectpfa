package com.example.apiadoptingcat.web.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.example.apiadoptingcat.business.services.CatService;
import com.example.apiadoptingcat.dao.entities.Cat;
import com.example.apiadoptingcat.dao.entities.Cat;
import com.example.apiadoptingcat.exceptions.DuplicateCatException;
import com.example.apiadoptingcat.web.dto.CatDTO;
import com.example.apiadoptingcat.web.dto.CatSummaryDTO;

import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/cats")
@PreAuthorize("hasAnyRole('ADMIN','USER')")
public class CatController {
    private final CatService catService;

    public CatController(CatService catService) {
        this.catService = catService;
    }

    @GetMapping()
    @PreAuthorize("hasAnyRole('ADMIN', 'USER') and hasAuthority('READ_PRIVILEGE')")
    public ResponseEntity<?> getAllCats(Authentication authentication) {
        List<CatSummaryDTO> cats = this.catService.getAllCats()
                .stream()
                .map(CatSummaryDTO::toCatSummaryDTO)
                // .map(cat->CatSummaryDTO.toCatSummaryDTO(cat))
                .collect(Collectors.toList());     
        return new ResponseEntity<>(cats, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER') and hasAuthority('READ_PRIVILEGE')")
    public ResponseEntity<?> getCatById(@PathVariable Long id) {
        CatDTO cat = CatDTO.toCatDTO(this.catService.getCatById(id));
        return new ResponseEntity<>(cat, HttpStatus.OK);
    }
    @PostMapping()
    @PreAuthorize("hasAuthority('WRITE_PRIVILEGE') and hasRole('ADMIN')")
    public ResponseEntity<?> addCat(@RequestBody CatDTO catDTO) throws DuplicateCatException {
         Cat cat = CatDTO.fromCatDTO(catDTO);
        return new ResponseEntity<>(this.catService.addCat(cat), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    
    @PreAuthorize("hasAuthority('UPDATE_PRIVILEGE') and hasRole('ADMIN')")
    public ResponseEntity<?> updateCat(@PathVariable Long id, @RequestBody CatDTO catDTO) throws DuplicateCatException{
        Cat cat = CatDTO.fromCatDTO(catDTO);
        return new ResponseEntity<>(this.catService.updateCat(id, cat), HttpStatus.OK);

    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('DELETE_PRIVILEGE') and hasRole('ADMIN')")
    public ResponseEntity<?> deleteCat(@PathVariable Long id) {
        this.catService.deleteCat(id);
        return new ResponseEntity<>( HttpStatus.NO_CONTENT);
    }  
}