package com.app.backend.controller;

import com.app.backend.modelo.ProductosIngredientes;
import com.app.backend.service.ProductosIngredientesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductosIngredientesController {

    private final ProductosIngredientesService productosIngredientesService;

    public ProductosIngredientesController(ProductosIngredientesService productosIngredientesService) {
        this.productosIngredientesService = productosIngredientesService;
    }

    @GetMapping
    public List<ProductosIngredientes> getAll() {
        return productosIngredientesService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductosIngredientes> getById(@PathVariable Integer id) {
        Optional<ProductosIngredientes> pi = productosIngredientesService.getById(id);
        return pi.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ProductosIngredientes> create(@RequestBody ProductosIngredientes pi) {
        ProductosIngredientes saved = productosIngredientesService.save(pi);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductosIngredientes> update(@PathVariable Integer id, @RequestBody ProductosIngredientes pi) {
        Optional<ProductosIngredientes> existing = productosIngredientesService.getById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        pi.setId(id);
        ProductosIngredientes updated = productosIngredientesService.save(pi);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        Optional<ProductosIngredientes> existing = productosIngredientesService.getById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        productosIngredientesService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
