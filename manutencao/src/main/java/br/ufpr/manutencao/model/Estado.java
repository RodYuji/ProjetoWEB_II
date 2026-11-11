package br.ufpr.manutencao.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
ABERTA, ORÇADA, REJEITADA, APROVADA, REDIRECIONADA, ARRUMADA, PAGA, FINALIZADA.
 */
@Entity
@Table(name = "tb_estado")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Estado {

    public static final String ABERTA = "ABERTA";
    public static final String ORCADA = "ORÇADA";
    public static final String REJEITADA = "REJEITADA";
    public static final String APROVADA = "APROVADA";
    public static final String REDIRECIONADA = "REDIRECIONADA";
    public static final String ARRUMADA = "ARRUMADA";
    public static final String PAGA = "PAGA";
    public static final String FINALIZADA = "FINALIZADA";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_est")
    private Integer id;

    @Column(name = "nome_est")
    private String nome;
}
