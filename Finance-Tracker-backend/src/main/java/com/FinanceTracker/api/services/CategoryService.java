package com.FinanceTracker.api.services;

import com.FinanceTracker.api.Exceptions.ResourceNotFoundException;
import com.FinanceTracker.api.dto.CategoryDTO;
import com.FinanceTracker.api.entity.CategoryEntity;
import com.FinanceTracker.api.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para manejar operaciones relacionadas con categorías.
 * Proporciona métodos para listar categorías y convertir entre entidades y DTOs.
 */
@Service
public class CategoryService {

    @Autowired
    CategoryRepository repository;


    /**
     * Recupera una lista de todas las categorías disponibles en el sistema.
     *
     * @return una lista de objetos CategoryDTO que representan todas las categorías.
     */
    public List<CategoryDTO> listCategories(){
        List<CategoryEntity> entity = repository.findAll();
         return entity.stream().map(this::entityToDTO).collect(Collectors.toList());
    }

    /**
     * Convierte una entidad CategoryEntity en un objeto CategoryDTO.
     *
     * @param entity la entidad CategoryEntity que se va a convertir.
     * @return una instancia de CategoryDTO.
     */
    public CategoryDTO entityToDTO(CategoryEntity entity){
        return new CategoryDTO(entity.getId(), entity.getName(), entity.getDescription());
    }
}
