package com.example.apiadoptingcat;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.apiadoptingcat.business.services.FilesStorageService;
import com.example.apiadoptingcat.dao.repositories.CatRepository;

import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@Slf4j
public class ApiadoptingcatApplication implements CommandLineRunner {

	@Resource
	CatRepository catRepository;
	@Resource
	FilesStorageService filesStorageService;
	public static void main(String[] args) {
		SpringApplication.run(ApiadoptingcatApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		log.info("Storage initialisation");
		filesStorageService.init();
		
	}


}