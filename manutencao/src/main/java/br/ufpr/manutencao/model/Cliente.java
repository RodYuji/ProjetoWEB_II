package br.ufpr.manutencao.model;

public class Cliente {
    private int id;
    private String cpf;
    private String nome;
    private String email;
    private String senha;
    private String telefone;
    private String enderecoCompleto;

    public Cliente() {}

    public Cliente(int id, String cpf, String nome, String email, String senha, String telefone, String enderecoCompleto) {
        this.id = id;
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.enderecoCompleto = enderecoCompleto;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getEnderecoCompleto() { return enderecoCompleto; }
    public void setEnderecoCompleto(String enderecoCompleto) { this.enderecoCompleto = enderecoCompleto; }
}