package br.ufpr.manutencao.model;

public class Cliente extends Usuario {
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

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getEnderecoCompleto() { return enderecoCompleto; }
    public void setEnderecoCompleto(String enderecoCompleto) { this.enderecoCompleto = enderecoCompleto; }
}
