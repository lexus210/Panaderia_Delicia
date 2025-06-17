package com.app.backend.controller;

import com.app.backend.modelo.Empleado;
import com.app.backend.service.EmpleadoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/empleados")
@CrossOrigin(origins = "*")
public class EmpleadoController {

    private final EmpleadoService empleadoService;

    public EmpleadoController(EmpleadoService empleadoService) {
        this.empleadoService = empleadoService;
    }

    @GetMapping
    public List<Empleado> getAll() {
        return empleadoService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empleado> getById(@PathVariable Integer id) {
        Optional<Empleado> empleado = empleadoService.getById(id);
        return empleado.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Empleado> create(@RequestBody Empleado empleado) {
        Empleado saved = empleadoService.save(empleado);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Empleado> update(@PathVariable Integer id, @RequestBody Empleado empleado) {
        Optional<Empleado> existing = empleadoService.getById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        empleado.setId(id);
        Empleado updated = empleadoService.save(empleado);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        Optional<Empleado> existing = empleadoService.getById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        empleadoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
