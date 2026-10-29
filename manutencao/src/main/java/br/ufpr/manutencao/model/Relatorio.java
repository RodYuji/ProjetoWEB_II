package br.ufpr.manutencao.model;

public class Relatorio {
    private String chave; // SERVE PRA DATA E PRA CATEGORIA
    private double totalReceita;

    public Relatorio() {}

    public Relatorio(String chave, double totalReceita) {
        this.chave = chave;
        this.totalReceita = totalReceita;
    }

    public String getChave() {
        return chave;
    }

    public void setChave(String chave) {
        this.chave = chave;
    }

    public double getTotalReceita() {
        return totalReceita;
    }

    public void setTotalReceita(double totalReceita) {
        this.totalReceita = totalReceita;
    }
}