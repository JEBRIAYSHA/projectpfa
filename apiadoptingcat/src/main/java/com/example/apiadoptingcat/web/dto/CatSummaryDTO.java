package com.example.apiadoptingcat.web.dto;

// import java.util.Date; (est correcte )
// import java.sql.Date;
import java.util.List;

import com.example.apiadoptingcat.dao.entities.Cat;

import lombok.Builder;

@Builder
public record CatSummaryDTO(
        Long id,
        String name,
        String race,
        String sex,
        Number age,
        List<String> vaccinations,
        boolean status,
        String image) {

    public static CatSummaryDTO toCatSummaryDTO(Cat cat) {
        CatSummaryDTO catSummaryDTO = CatSummaryDTO.builder()
                .id(cat.getId())
                .name(cat.getName())
                .race(cat.getRace())
                .sex(cat.getSex())
                .age(cat.getAge())
                .vaccinations(cat.getVaccinations())
                .status(cat.isStatus())
                .image(cat.getImage())
                .build();
        return catSummaryDTO;

        // on n'est pas obligee d'un constructeur bien determinee : donc on utilise la
        // methode ci dessus (avec builder)
        //
        // Without Builder
        /*
         * return new CatSummaryDTO(cat.getId(), cat.getName(),
         * cat.isFeatured());
         */
    }
}
