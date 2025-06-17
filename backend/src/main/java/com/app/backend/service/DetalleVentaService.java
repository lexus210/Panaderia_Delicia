package com.app.backend.service;

import com.app.backend.modelo.DetalleVenta;
import com.app.backend.repository.DetalleVentaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DetalleVentaService {

    private final DetalleVentaRepository detalleVentaRepository;

    public DetalleVentaService(DetalleVentaRepository detalleVentaRepository) {
        this.detalleVentaRepository = detalleVentaRepository;
    }

    public List<DetalleVenta> getAll() {
        return detalleVentaRepository.findAll();
    }

    public Optional<DetalleVenta> getById(Integer id) {
        return detalleVentaRepository.findById(id);
    }

    public DetalleVenta save(DetalleVenta detalleVenta) {
        return detalleVentaRepository.save(detalleVenta);
    }

    public void deleteById(Integer id) {
        detalleVentaRepository.deleteById(id);
    }
}
