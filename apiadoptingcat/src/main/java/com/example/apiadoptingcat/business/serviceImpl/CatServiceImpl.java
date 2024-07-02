package com.example.apiadoptingcat.business.serviceImpl;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.example.apiadoptingcat.business.services.CatService;
import com.example.apiadoptingcat.business.services.FilesStorageService;
import com.example.apiadoptingcat.dao.entities.Cat;
import com.example.apiadoptingcat.dao.repositories.CatRepository;
import com.example.apiadoptingcat.exceptions.DuplicateCatException;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class CatServiceImpl implements CatService {

    private final CatRepository catRepository;
    private final FilesStorageService filesStorageService;

    public CatServiceImpl(CatRepository catRepository,
            FilesStorageService filesStorageService) {
        this.catRepository = catRepository;
        this.filesStorageService = filesStorageService;
    }

    @Override
    public List<Cat> getAllCats() {
        return this.catRepository.findAll(Sort.by(Direction.ASC, "name"));

    }

    @Override
    public Cat getCatById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        // Retrieve the cat by ID, throw an EntityNotFoundException if not found
        return this.catRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cat with id: " + id + " not found"));
    }

    @Override
    public Cat addCat(Cat cat) throws DuplicateCatException {
        // Check if the cat is null and throw an IllegalArgumentException if it is
        if (cat == null) {
            throw new IllegalArgumentException("Cat cannot be null");
        }
        try {
            // Save the cat in the repository
            return catRepository.save(cat);
        } catch (DataIntegrityViolationException e) {
            // Handle uniqueness constraint violations
            throw new DuplicateCatException(
                    "A cat with the same email or other unique field already exists.");
        }
    }

    @Override
    public Cat updateCat(Long id, Cat cat) throws DuplicateCatException {
        // Check if the ID or cat is null and throw an IllegalArgumentException if they
        // are
        if (id == null || cat == null) {
            throw new IllegalArgumentException("ID or Cat cannot be null");
        }

        // Verify the existence of the cat
        getCatById(id);

        // Save the updated cat in the repository
        return catRepository.save(cat);

    }

    @Override
    @Transactional
    public void deleteCat(Long id) {

        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        try {
            // Retrieve the cat by ID
            Cat cat = this.getCatById(id);
            // Get the image filename associated with the cat
            String filename = cat.getImage();
            // If the cat has an image, delete it
            if (filename != null) {
                filesStorageService.delete(filename);
            }
            // Delete the cat from the repository by ID
            catRepository.deleteById(id);
        } catch (DataAccessException e) {
            // Capture any data access exceptions (e.g., foreign key constraint violations)
            throw new RuntimeException("Failed to delete cat with id: " + id, e);
        }

    }

    @Override
    public Cat updateCatImage(Long id, String filename) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }

        // Retrieve the cat by ID, throw an EntityNotFoundException if the cat
        // is not found
        Cat cat = getCatById(id);

        // Check if the cat already has an image
        if (cat.getImage() == null) {
            // If the cat does not have an image, set the new image
            cat.setImage(filename);
        } else {
            // If the cat already has an image, delete the old image
            this.filesStorageService.delete(cat.getImage());
            // Set the new image
            cat.setImage(filename);
        }
        // Save and return the updated cat in the repository
        return catRepository.save(cat);

    }

}