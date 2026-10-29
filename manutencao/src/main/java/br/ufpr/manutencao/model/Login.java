package br.ufpr.manutencao.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Dados enviados no corpo do POST /login.
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Login {
    private String email;
    private String senha;
}
