package br.ufpr.manutencao.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Classe base dos usuarios do sistema.
 * Cliente e Funcionario estendem esta classe.
 *
 * O login e feito por e-mail + senha. A senha nunca e guardada em texto puro:
 * o campo "senha" armazena o hash SHA-256 de (senha + salt), e o "salt"
 * e gerado aleatoriamente para cada usuario (ver util.SenhaUtil).
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Usuario {

    private int id;

    private String nome;

    /** Usado como login. */
    private String email;

    /** Hash SHA-256 da senha concatenada com o salt. Pode ser recebido no JSON, mas nunca e devolvido. */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String senha;

    /** Valor aleatorio usado no hash da senha. Nunca entra nem sai no JSON. */
    @JsonIgnore
    private String salt;

    /** "CLIENTE" ou "FUNCIONARIO". */
    private String perfil;
}
