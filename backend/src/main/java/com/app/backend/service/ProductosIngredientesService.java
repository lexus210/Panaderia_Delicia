package com.app.backend.service;

import com.app.backend.modelo.ProductosIngredientes;
import com.app.backend.repository.ProductosIngredientesRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductosIngredientesService {

    private final ProductosIngredientesRepository productosIngredientesRepository;

    public ProductosIngredientesService(ProductosIngredientesRepository productosIngredientesRepository) {
        this.productosIngredientesRepository = productosIngredientesRepository;
    }

    public List<ProductosIngredientes> getAll() {
        return productosIngredientesRepository.findAll();
    }

    public Optional<ProductosIngredientes> getById(Integer id) {
        return productosIngredientesRepository.findById(id);
    }

    public ProductosIngredientes save(ProductosIngredientes pi) {
        return productosIngredientesRepository.save(pi);
    }

    public void deleteById(Integer id) {
        productosIngredientesRepository.deleteById(id);
    }
}
