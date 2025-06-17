package com.app.backend.modelo;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "detalle_venta")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetalleVenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "venta_id")
    private Venta venta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "producto_id")
    private Producto producto;

    private Integer cantidad;

    @Column(name = "precio_unitario")
    private Double precioUnitario;

    @Column(columnDefinition = "decimal GENERATED ALWAYS AS (cantidad * precio_unitario) STORED")
    private Double subtotal;

    private String descripcion;

    @Column(name = "descuento_item")
    private Double descuentoItem;

    @Column(name = "tipo_presentacion")
    private String tipoPresentacion;

    @Column(name = "codigo_item")
    private String codigoItem;

    private String observaciones;
}
