package br.ufpr.manutencao.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tb_funcionario")
@PrimaryKeyJoinColumn(name = "id_fun", referencedColumnName = "id_usu")
@Getter
@Setter
public class Funcionario extends Usuario {

    @Temporal(TemporalType.DATE)
    @Column(name = "data_nasc_fun")
    private Date dataNascimento;

    public Funcionario() {
        super();
        setPerfil("FUNCIONARIO");
    }

    public Funcionario(Integer id, String nome, String email, String senha, Date dataNascimento) {
        super(id, nome, email, senha, null, "FUNCIONARIO");
        this.dataNascimento = dataNascimento;
    }
}
