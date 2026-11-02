package br.ufpr.manutencao.model;
import java.util.Date;

public class Funcionario extends Usuario {
    private Date dataNascimento;

    public Funcionario() {
        super();
        setPerfil("FUNCIONARIO");
    }

    public Funcionario(int id, String nome, String email, String senha, Date dataNascimento) {
        super(id, nome, email, senha, null, "FUNCIONARIO");
        this.dataNascimento = dataNascimento;
    }

    public Date getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(Date dataNascimento) { this.dataNascimento = dataNascimento; }
}
