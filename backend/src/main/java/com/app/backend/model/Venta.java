package com.app.backend.modelo;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ventas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    private LocalDateTime fecha;

    private Double total;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_pago")
    private TipoPago tipoPago;

    @Column(name = "numero_comprobante")
    private String numeroComprobante;

    private Double igv;

    private Double descuento;

    @Enumerated(EnumType.STRING)
    private Estado estado;

    private String observaciones;

    @Column(name = "empleado_id")
    private Integer empleadoId; // Sin relación para simplificar

    @Column(name = "forma_entrega")
    @Enumerated(EnumType.STRING)
    private FormaEntrega formaEntrega;

    public enum TipoPago {
        efectivo, tarjeta, yape, plin, otro
    }

    public enum Estado {
        completado, pendiente, cancelado
    }

    public enum FormaEntrega {
        recojo, delivery
    }
}
