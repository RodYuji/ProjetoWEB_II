package br.ufpr.manutencao.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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
 * Solicitacao de manutencao (tabela tb_solicitacao).
 * O historico de mudancas de estado fica em Historico (tb_historico).
 */
@Entity
@Table(name = "tb_solicitacao")
@NoArgsConstructor
@Getter
@Setter
public class Solicitacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sol")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_cli")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "id_cat")
    private Categoria categoria;

    /** Estado atual. */
    @ManyToOne
    @JoinColumn(name = "id_est")
    private Estado estado;

    @Column(name = "desc_equip_sol")
    private String descricaoEquipamento;

    @Column(name = "desc_defeito_sol")
    private String descricaoDefeito;

    @Column(name = "data_hora_sol")
    private LocalDateTime dataHora;

    // RF012 Efetuar Orcamento
    @Column(name = "valor_orc_sol")
    private BigDecimal valorOrcamento;

    @ManyToOne
    @JoinColumn(name = "id_fun_orc")
    private Funcionario funcionarioOrcamento;

    @Column(name = "data_hora_orc_sol")
    private LocalDateTime dataHoraOrcamento;

    // RF014 Efetuar Manutencao
    @Column(name = "desc_manut_sol")
    private String descricaoManutencao;

    @Column(name = "orient_cli_sol")
    private String orientacoesCliente;

    @ManyToOne
    @JoinColumn(name = "id_fun_manut")
    private Funcionario funcionarioManutencao;

    @Column(name = "data_hora_manut_sol")
    private LocalDateTime dataHoraManutencao;

    // RF015 Redirecionar: funcionario responsavel atual (destino do ultimo redirecionamento)
    @ManyToOne
    @JoinColumn(name = "id_fun_resp")
    private Funcionario funcionarioResponsavel;

    // RF010 Pagar
    @Column(name = "data_hora_pag_sol")
    private LocalDateTime dataHoraPagamento;

    // RF016 Finalizar
    @ManyToOne
    @JoinColumn(name = "id_fun_final")
    private Funcionario funcionarioFinalizacao;

    @Column(name = "data_hora_final_sol")
    private LocalDateTime dataHoraFinalizacao;
}
