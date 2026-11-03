package br.ufpr.manutencao.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tb_categoria")
@NoArgsConstructor
@AllArgsConstructor
public class Categoria {
    @Setter @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cat")
    private Integer id;

    @Setter @Getter
    @Column(name = "nome_cat")
    private String nome;

    @Setter @Getter
    @Column(name = "ativo_cat")
    private boolean ativo;
}
