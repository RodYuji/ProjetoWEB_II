package br.ufpr.manutencao.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
public class Categoria {
    @Setter @Getter
    private int id;
    @Setter @Getter
    private String nome;
    @Setter @Getter
    private boolean ativo;
}
