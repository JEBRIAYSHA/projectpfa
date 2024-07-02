package com.example.apiadoptingcat.web.dto;

import java.util.Date;
import java.util.List;

import com.example.apiadoptingcat.dao.entities.Cat;

import lombok.Builder;

@Builder
public record CatDTO(
    Long id,
    String name,
    String race,
    float weight,
    String sex,
    Date dat_of_birth,
    int age,
    List<String> vaccinations,
    String description,
    boolean status,
    String mediacl_history,
    String image) {

  public static CatDTO toCatDTO(Cat cat) {
    CatDTO catDTO = CatDTO.builder()
        .id(cat.getId())
        .name(cat.getName())
        .race(cat.getRace())
        .weight(cat.getWeight())
        .sex(cat.getSex())
        .dat_of_birth(cat.getDat_of_birth())
        .age(cat.getAge())
        .vaccinations(cat.getVaccinations())
        .description(cat.getDescription())
        .mediacl_history(cat.getMediacl_history())
        .image(cat.getImage())
        .status(cat.isStatus()).build();
    return catDTO;

    // Without builder
    /*
     * return new CatDTO(cat.getId(), cat.getName(), ...);
     */

  }

  public static Cat fromCatDTO(CatDTO catDTO) {
    Cat cat = Cat.builder()
        .id(catDTO.id)
        .name(catDTO.name)
        .race(catDTO.race)
        .weight(catDTO.weight)
        .sex(catDTO.sex)
        .dat_of_birth(catDTO.dat_of_birth)
        .age(catDTO.age)
        .vaccinations(catDTO.vaccinations)
        .description(catDTO.description)
        .mediacl_history(catDTO.mediacl_history)
        .image(catDTO.image)
        .status(catDTO.status).build();
    return cat;

    // Without builder

    /*
     * return new Cat(catDTO.id, catDTO.name, .....);
     */
  }

}
