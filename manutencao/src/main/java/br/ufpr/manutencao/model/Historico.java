package br.ufpr.manutencao.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Uma linha do historico de uma solicitacao (tabela tb_historico).
 * Toda mudanca de estado deve gravar um Historico (RF008, RF009, RF015).
 */
@Entity
@Table(name = "tb_historico")
@NoArgsConstructor
@Getter
@Setter
public class Historico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_his")
    private Integer id;

    /** Nao vai no JSON para evitar repetir a solicitacao inteira em cada linha. */
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_sol")
    private Solicitacao solicitacao;

    @Column(name = "data_hora_his")
    private LocalDateTime dataHora;

    /** Nulo na abertura da solicitacao. */
    @ManyToOne
    @JoinColumn(name = "id_est_anterior")
    private Estado estadoAnterior;

    @ManyToOne
    @JoinColumn(name = "id_est_novo")
    private Estado estadoNovo;

    /** Funcionario que fez a acao; nulo quando a acao e do cliente. */
    @ManyToOne
    @JoinColumn(name = "id_fun")
    private Funcionario funcionario;

    /** Destino, apenas em redirecionamento. */
    @ManyToOne
    @JoinColumn(name = "id_fun_destino")
    private Funcionario funcionarioDestino;

    /** Ex.: motivo da rejeicao. */
    @Column(name = "obs_his")
    private String observacao;
}
