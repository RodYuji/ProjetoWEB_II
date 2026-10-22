package br.ufpr.manutencao.model;
import java.time.LocalDateTime;

public class Historico {
    private int id;
    private int solicitacaoId;
    private LocalDateTime dataHora;
    private String estado;
    private Funcionario funcionario;
    private Funcionario funcionarioOrigem;
    private Funcionario funcionarioDestino;


    public Historico() {}

    public Historico(int id, int solicitacaoId, LocalDateTime dataHora, String estado, Funcionario funcionario, Funcionario funcionarioOrigem, Funcionario funcionarioDestino) {
        this.id = id;
        this.solicitacaoId = solicitacaoId;
        this.dataHora = dataHora;
        this.estado = estado;
        this.funcionario = funcionario;
        this.funcionarioOrigem = funcionarioOrigem;
        this.funcionarioDestino = funcionarioDestino;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getSolicitacaoId() { return solicitacaoId; }
    public void setSolicitacaoId(int solicitacaoId) { this.solicitacaoId = solicitacaoId; }

    public LocalDateTime getDataHora() { return dataHora; }
    public void setDataHora(LocalDateTime dataHora) { this.dataHora = dataHora; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public Funcionario getFuncionario() { return funcionario; }
    public void setFuncionario(Funcionario funcionario) { this.funcionario = funcionario; }

    public Funcionario getFuncionarioOrigem() { return funcionarioOrigem; }
    public void setFuncionarioOrigem(Funcionario funcionarioOrigem) { this.funcionarioOrigem = funcionarioOrigem; }

    public Funcionario getFuncionarioDestino() { return funcionarioDestino; }
    public void setFuncionarioDestino(Funcionario funcionarioDestino) { this.funcionarioDestino = funcionarioDestino; }
}
