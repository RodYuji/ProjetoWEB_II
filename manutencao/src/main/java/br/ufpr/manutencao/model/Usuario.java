package br.ufpr.manutencao.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Classe base dos usuarios do sistema (tabela tb_usuario).
 * Cliente (tb_cliente) e Funcionario (tb_funcionario) estendem esta classe:
 * os dados de login ficam em tb_usuario e cada subclasse guarda so o que e
 * especifico, usando o mesmo id (heranca JOINED).
 *
 * O login e feito por e-mail + senha. A senha nunca e guardada em texto puro:
 * o campo "senha" armazena o hash SHA-256 de (senha + salt), e o "salt"
 * e gerado aleatoriamente para cada usuario (ver util.SenhaUtil).
 */
@Entity
@Table(name = "tb_usuario")
@Inheritance(strategy = InheritanceType.JOINED)
@NoArgsConstructor
@Getter
@Setter
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usu")
    private Integer id;

    @Column(name = "nome_usu")
    private String nome;

    /** Usado como login. */
    @Column(name = "email_usu")
    private String email;

    /** Hash SHA-256 da senha concatenada com o salt. Pode ser recebido no JSON, mas nunca e devolvido. */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "senha_usu")
    private String senha;

    /** Valor aleatorio usado no hash da senha. Nunca entra nem sai no JSON. */
    @JsonIgnore
    @Column(name = "salt_usu")
    private String salt;

    /** "CLIENTE" ou "FUNCIONARIO". */
    @Column(name = "perfil_usu")
    private String perfil;

    /** Remocao = desativacao (requisito nao funcional do enunciado). */
    @Column(name = "ativo_usu")
    private boolean ativo = true;

    public Usuario(Integer id, String nome, String email, String senha, String salt, String perfil) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.salt = salt;
        this.perfil = perfil;
        this.ativo = true;
    }
}
