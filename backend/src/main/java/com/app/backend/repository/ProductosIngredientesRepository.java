package com.app.backend.repository;

import com.app.backend.modelo.ProductosIngredientes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductosIngredientesRepository extends JpaRepository<ProductosIngredientes, Integer> {
}
