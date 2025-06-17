package com.app.backend.modelo;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "productos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;

    private String descripcion;

    private Double precio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    private Integer stock;

    @Column(name = "imagen_url")
    private String imagenUrl;

    private Double peso;

    @Column(name = "tiempo_preparacion")
    private Integer tiempoPreparacion;

    @Enumerated(EnumType.STRING)
    private Estado estado;

    @Column(name = "codigo_producto")
    private String codigoProducto;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    public enum Estado {
        activo, inactivo
    }
}
