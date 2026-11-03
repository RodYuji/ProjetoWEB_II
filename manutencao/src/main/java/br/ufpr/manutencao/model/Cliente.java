package br.ufpr.manutencao.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tb_cliente")
@PrimaryKeyJoinColumn(name = "id_cli", referencedColumnName = "id_usu")
@Getter
@Setter
public class Cliente extends Usuario {

    @Column(name = "cpf_cli")
    private String cpf;

    @Column(name = "telefone_cli")
    private String telefone;

    // Endereco completo (RF001). Cidade e estado nao normalizados, como permite o enunciado.
    @Column(name = "cep_cli")
    private String cep;

    @Column(name = "logradouro_cli")
    private String logradouro;

    @Column(name = "numero_cli")
    private String numero;

    @Column(name = "complemento_cli")
    private String complemento;

    @Column(name = "bairro_cli")
    private String bairro;

    @Column(name = "cidade_cli")
    private String cidade;

    @Column(name = "uf_cli")
    private String uf;

    public Cliente() {
        super();
        setPerfil("CLIENTE");
    }

    public Cliente(Integer id, String cpf, String nome, String email, String senha, String telefone,
                   String cep, String logradouro, String numero, String complemento,
                   String bairro, String cidade, String uf) {
        super(id, nome, email, senha, null, "CLIENTE");
        this.cpf = cpf;
        this.telefone = telefone;
        this.cep = cep;
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
    }
}
