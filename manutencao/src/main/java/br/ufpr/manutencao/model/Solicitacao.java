package br.ufpr.manutencao.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class Solicitacao {
    private int id;
    private String descricaoEquipamento;
    private String categoriaEquipamento;
    private String descricaoDefeito;
    private LocalDateTime dataHora;
    private Estado estado;
    private int clienteId;

    private BigDecimal valorOrcamento;
    private String funcionarioOrcamento;
    private LocalDateTime dataHoraOrcamento;
    private String motivoRejeicao;

    private String descricaoManutencao;
    private String orientacoesCliente;
    private String funcionarioManutencao;
    private LocalDateTime dataHoraManutencao;

    private String funcionarioOrigemRedirecionamento;
    private String funcionarioDestinoRedirecionamento;
    private LocalDateTime dataHoraRedirecionamento;

    private String funcionarioFinalizouManutencao;
    private LocalDateTime dataHoraFinalizouManutencao;
    private LocalDateTime dataPagamento;

    public Solicitacao() {}

    public Solicitacao(int id, String descricaoEquipamento, String categoriaEquipamento,
                       String descricaoDefeito, LocalDateTime dataHora, Estado estado,
                       int clienteId) {
        this.id = id;
        this.descricaoEquipamento = descricaoEquipamento;
        this.categoriaEquipamento = categoriaEquipamento;
        this.descricaoDefeito = descricaoDefeito;
        this.dataHora = dataHora;
        this.estado = estado;
        this.clienteId = clienteId;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getDescricaoEquipamento() { return descricaoEquipamento; }
    public void setDescricaoEquipamento(String descricaoEquipamento) { this.descricaoEquipamento = descricaoEquipamento; }

    public String getCategoriaEquipamento() { return categoriaEquipamento; }
    public void setCategoriaEquipamento(String categoriaEquipamento) { this.categoriaEquipamento = categoriaEquipamento; }

    public String getDescricaoDefeito() { return descricaoDefeito; }
    public void setDescricaoDefeito(String descricaoDefeito) { this.descricaoDefeito = descricaoDefeito; }

    public LocalDateTime getDataHora() { return dataHora; }
    public void setDataHora(LocalDateTime dataHora) { this.dataHora = dataHora; }

    public Estado getEstado() { return estado; }
    public void setEstado(Estado estado) { this.estado = estado; }

    public int getClienteId() { return clienteId; }
    public void setClienteId(int clienteId) { this.clienteId = clienteId; }

    public BigDecimal getValorOrcamento() { return valorOrcamento; }
    public void setValorOrcamento(BigDecimal valorOrcamento) { this.valorOrcamento = valorOrcamento; }

    public String getFuncionarioOrcamento() { return funcionarioOrcamento; }
    public void setFuncionarioOrcamento(String funcionarioOrcamento) { this.funcionarioOrcamento = funcionarioOrcamento; }

    public LocalDateTime getDataHoraOrcamento() { return dataHoraOrcamento; }
    public void setDataHoraOrcamento(LocalDateTime dataHoraOrcamento) { this.dataHoraOrcamento = dataHoraOrcamento; }

    public String getMotivoRejeicao() { return motivoRejeicao; }
    public void setMotivoRejeicao(String motivoRejeicao) { this.motivoRejeicao = motivoRejeicao; }

    public String getDescricaoManutencao() { return descricaoManutencao; }
    public void setDescricaoManutencao(String descricaoManutencao) { this.descricaoManutencao = descricaoManutencao; }

    public String getOrientacoesCliente() { return orientacoesCliente; }
    public void setOrientacoesCliente(String orientacoesCliente) { this.orientacoesCliente = orientacoesCliente; }

    public String getFuncionarioManutencao() { return funcionarioManutencao; }
    public void setFuncionarioManutencao(String funcionarioManutencao) { this.funcionarioManutencao = funcionarioManutencao; }

    public LocalDateTime getDataHoraManutencao() { return dataHoraManutencao; }
    public void setDataHoraManutencao(LocalDateTime dataHoraManutencao) { this.dataHoraManutencao = dataHoraManutencao; }

    public String getFuncionarioOrigemRedirecionamento() { return funcionarioOrigemRedirecionamento; }
    public void setFuncionarioOrigemRedirecionamento(String funcionarioOrigemRedirecionamento) { this.funcionarioOrigemRedirecionamento = funcionarioOrigemRedirecionamento; }

    public String getFuncionarioDestinoRedirecionamento() { return funcionarioDestinoRedirecionamento; }
    public void setFuncionarioDestinoRedirecionamento(String funcionarioDestinoRedirecionamento) { this.funcionarioDestinoRedirecionamento = funcionarioDestinoRedirecionamento; }

    public LocalDateTime getDataHoraRedirecionamento() { return dataHoraRedirecionamento; }
    public void setDataHoraRedirecionamento(LocalDateTime dataHoraRedirecionamento) { this.dataHoraRedirecionamento = dataHoraRedirecionamento; }

    public String getFuncionarioFinalizouManutencao() { return funcionarioFinalizouManutencao; }
    public void setFuncionarioFinalizouManutencao(String funcionarioFinalizouManutencao) { this.funcionarioFinalizouManutencao = funcionarioFinalizouManutencao; }

    public LocalDateTime getDataHoraFinalizouManutencao() { return dataHoraFinalizouManutencao; }
    public void setDataHoraFinalizouManutencao(LocalDateTime dataHoraFinalizouManutencao) { this.dataHoraFinalizouManutencao = dataHoraFinalizouManutencao; }

    public LocalDateTime getDataPagamento() { return dataPagamento; }
    public void setDataPagamento(LocalDateTime dataPagamento) { this.dataPagamento = dataPagamento; }

    public enum Estado {
        ABERTA,
        ORÇADA,
        REJEITADA,
        APROVADA,
        REDIRECIONADA,
        ARRUMADA,
        PAGA,
        FINALIZADA
    }
}
