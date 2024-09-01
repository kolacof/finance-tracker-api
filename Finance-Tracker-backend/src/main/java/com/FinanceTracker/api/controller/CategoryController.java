package com.FinanceTracker.api.controller;

import com.FinanceTracker.api.dto.CategoryDTO;
import com.FinanceTracker.api.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador para manejar operaciones relacionadas con categorías.
 * Proporciona endpoints para gestionar las categorías en la aplicación FinanceTracker.
 */
@RequestMapping("/category")
@RestController
public class CategoryController {
    @Autowired
    CategoryService service;

    /**
     * Recupera una lista de todas las categorías.
     *
     * @return una lista de objetos CategoryDTO que representan todas las categorías.
     */
    @GetMapping("")
    public ResponseEntity<List<CategoryDTO>>  listCategories(){
        return new ResponseEntity<>(service.listCategories(), HttpStatus.OK);
    }
}
