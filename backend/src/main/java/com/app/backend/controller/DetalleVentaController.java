package com.app.backend.controller;

import com.app.backend.modelo.DetalleVenta;
import com.app.backend.service.DetalleVentaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/detalle-venta")
@CrossOrigin(origins = "*")
public class DetalleVentaController {

    private final DetalleVentaService detalleVentaService;

    public DetalleVentaController(DetalleVentaService detalleVentaService) {
        this.detalleVentaService = detalleVentaService;
    }

    @GetMapping
    public List<DetalleVenta> getAll() {
        return detalleVentaService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetalleVenta> getById(@PathVariable Integer id) {
        Optional<DetalleVenta> dv = detalleVentaService.getById(id);
        return dv.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DetalleVenta> create(@RequestBody DetalleVenta detalleVenta) {
        DetalleVenta saved = detalleVentaService.save(detalleVenta);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DetalleVenta> update(@PathVariable Integer id, @RequestBody DetalleVenta detalleVenta) {
        Optional<DetalleVenta> existing = detalleVentaService.getById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        detalleVenta.setId(id);
        DetalleVenta updated = detalleVentaService.save(detalleVenta);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        Optional<DetalleVenta> existing = detalleVentaService.getById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        detalleVentaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
