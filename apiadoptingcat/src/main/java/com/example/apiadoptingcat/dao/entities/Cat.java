package com.example.apiadoptingcat.dao.entities;


import java.util.Date;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity

@Table(name="cats")
public class Cat {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String race ;

    @Column(nullable = false)
    private float weight ;

    @Column(nullable = false)
    private String sex ;


    @Column(nullable = false)
    private Date dat_of_birth ;

    @Column(nullable = false)
    private int age ;
    

    // @Column(nullable = false, unique = true)
    // private String ;


    
    @ElementCollection(fetch= FetchType.EAGER)
    @CollectionTable(
            name="vaccinations",
            joinColumns = @JoinColumn(name="cat_id")
            )
    @Column(name="cat_vaccination")
    private List<String> vaccinations;

    @Column(nullable = false)
    private String description ;

    @Column(nullable = false)
    private String  mediacl_history ;

    @Column(nullable = true)
    private String image;

    @Column(nullable = true)
    private boolean status;
    
}













