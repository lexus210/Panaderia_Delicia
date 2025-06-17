package com.app.backend.modelo;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "productos_ingredientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductosIngredientes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "producto_id")
    private Producto producto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingrediente_id")
    private Ingrediente ingrediente;

    private Double cantidad;

    private String unidad;

    @Column(name = "orden_preparacion")
    private Integer ordenPreparacion;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_uso")
    private TipoUso tipoUso;

    @Column(name = "tiempo_aplicacion")
    private Integer tiempoAplicacion;

    @Column(name = "es_opcional")
    private Boolean esOpcional;

    private String observaciones;

    @Column(name = "creado_por")
    private String creadoPor;

    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro;

    public enum TipoUso {
        base, decoración, relleno
    }
}
