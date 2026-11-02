package br.ufpr.manutencao.model;

import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "cliente")
public class Cliente extends Usuario{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String cpf;
    private String telefone;
    private String enderecoCompleto;

    public Cliente() {
        super();
        setPerfil("CLIENTE");
    }

    public Cliente(int id, String cpf, String nome, String email, String senha, String telefone, String enderecoCompleto) {
        super(id, nome, email, senha, null, "CLIENTE");
        this.cpf = cpf;
        this.telefone = telefone;
        this.enderecoCompleto = enderecoCompleto;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getEnderecoCompleto() { return enderecoCompleto; }
    public void setEnderecoCompleto(String enderecoCompleto) { this.enderecoCompleto = enderecoCompleto; }
}
