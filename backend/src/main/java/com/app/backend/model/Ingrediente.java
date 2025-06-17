package com.app.backend.modelo;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "ingredientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ingrediente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;

    private String unidad;

    @Column(name = "stock_actual")
    private Double stockActual;

    @Column(name = "stock_minimo")
    private Double stockMinimo;

    private String proveedor;

    @Column(name = "costo_unitario")
    private Double costoUnitario;

    @Column(name = "fecha_ultimo_ingreso")
    private LocalDate fechaUltimoIngreso;

    @Column(name = "ubicacion_almacen")
    private String ubicacionAlmacen;

    @Column(name = "codigo_barras")
    private String codigoBarras;

    @Enumerated(EnumType.STRING)
    private Estado estado;

    private String observaciones;

    public enum Estado {
        activo, inactivo
    }
}
