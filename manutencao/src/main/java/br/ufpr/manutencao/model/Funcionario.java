package br.ufpr.manutencao.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tb_funcionario")
@PrimaryKeyJoinColumn(name = "id_fun", referencedColumnName = "id_usu")
@Getter
@Setter
public class Funcionario extends Usuario {

    @Column(name = "data_nasc_fun")
    private LocalDate dataNascimento;

    public Funcionario() {
        super();
        setPerfil("FUNCIONARIO");
    }

    public Funcionario(Integer id, String nome, String email, String senha, LocalDate dataNascimento) {
        super(id, nome, email, senha, null, "FUNCIONARIO");
        this.dataNascimento = dataNascimento;
    }
}