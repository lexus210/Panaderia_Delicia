package com.app.backend.controller;

import com.app.backend.modelo.Ingrediente;
import com.app.backend.service.IngredienteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ingredientes")
@CrossOrigin(origins = "*")
public class IngredienteController {

    private final IngredienteService ingredienteService;

    public IngredienteController(IngredienteService ingredienteService) {
        this.ingredienteService = ingredienteService;
    }

    @GetMapping
    public List<Ingrediente> getAll() {
        return ingredienteService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ingrediente> getById(@PathVariable Integer id) {
        Optional<Ingrediente> ingrediente = ingredienteService.getById(id);
        return ingrediente.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Ingrediente> create(@RequestBody Ingrediente ingrediente) {
        Ingrediente saved = ingredienteService.save(ingrediente);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ingrediente> update(@PathVariable Integer id, @RequestBody Ingrediente ingrediente) {
        Optional<Ingrediente> existing = ingredienteService.getById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        ingrediente.setId(id);
        Ingrediente updated = ingredienteService.save(ingrediente);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        Optional<Ingrediente> existing = ingredienteService.getById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        ingredienteService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
