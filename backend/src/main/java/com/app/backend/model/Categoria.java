package com.app.backend.modelo;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "categorias")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;
    private String descripcion;

    @Enumerated(EnumType.STRING)
    private Tipo tipo;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @Column(name = "imagen_url")
    private String imagenUrl;

    private Integer popularidad;

    private Boolean destacado;

    @Enumerated(EnumType.STRING)
    private Estado estado;

    @Column(name = "codigo_categoria")
    private String codigoCategoria;

    private Integer orden;

    private String observaciones;

    public enum Tipo {
        pan, pastel, galleta, otros
    }

    public enum Estado {
        activo, inactivo
    }
}
