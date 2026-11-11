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

    @Column(name = "email_usu")
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "senha_usu")
    private String senha;

    @JsonIgnore
    @Column(name = "salt_usu")
    private String salt;

    @Column(name = "perfil_usu")
    private String perfil;

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
