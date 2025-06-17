package com.app.backend.modelo;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "empleados")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Empleado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;
    private String apellido;

    @Column(unique = true)
    private String usuario;

    private String password;

    @Enumerated(EnumType.STRING)
    private Rol rol;

    private String email;
    private String telefono;
    private String direccion;

    @Column(name = "fecha_ingreso")
    private LocalDate fechaIngreso;

    @Enumerated(EnumType.STRING)
    private Estado estado;

    private String observaciones;

    public enum Rol {
        admin, vendedor, repostero
    }

    public enum Estado {
        activo, inactivo
    }
}
