import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';
import { jsPDF } from 'jspdf'; //import the serviço nativo do JS para exportar PDF

interface ReceitaDiaria {
  data: string;
  itens: { descricao: string; valor: number }[];
  total: number;
}

@Component({
  selector: 'app-relatorio-receitas',
  imports: [FormsModule],
  templateUrl: './relatorio-receitas.html',
  styleUrl: './relatorio-receitas.css',
})

//classe do relatório
export class RelatorioReceitas {
  dataInicial = '';
  dataFinal = '';
  receitas: ReceitaDiaria[] = [];
  totalReceitas = 0;
  mensagemErro = '';

  private readonly solicitacoes: any[];

  constructor(private readonly solicitacaoService: SolicitacaoService) {
    this.solicitacoes = this.solicitacaoService.solicitacoes;
    this.aplicarFiltro();
  }

  aplicarFiltro(): void {
    this.mensagemErro = '';

    if (this.dataInicial && this.dataFinal && this.dataInicial > this.dataFinal) {
        this.mensagemErro = 'A data inicial deve ser anterior ou igual à data final.';
        this.receitas = [];
        this.totalReceitas = 0;
        return;
    }

    const receitasPorDia = new Map<string, { descricao: string; valor: number }[]>();

    this.solicitacoes.filter((solicitacao) => solicitacao.status === 'PAGA').forEach((solicitacao) => {
        const data = this.obterData(solicitacao.dataPagamento ?? solicitacao.data);
        if (!data || !this.noIntervalo(data)) {
          return;
        }

        const chave = this.formatarDataISO(data);
        const itens = receitasPorDia.get(chave) ?? [];
        itens.push({ descricao: solicitacao.equipamento ?? solicitacao.descricao ?? 'Serviço de manutenção', valor: Number(solicitacao.valor) || 0,});
        receitasPorDia.set(chave, itens);
      });

    this.receitas = [...receitasPorDia.entries()].sort(([dataA], [dataB]) => dataA.localeCompare(dataB)).map(([data, itens]) => ({data, itens, total: itens.reduce((total, item) => total + item.valor, 0),}));
    this.totalReceitas = this.receitas.reduce((total, receita) => total + receita.total, 0);
  }

  gerarPdf(): void {
    const documento = new jsPDF();
    let posicaoY = 20;

    documento.setFontSize(18);
    documento.text('Relatório de Receitas', 20, posicaoY);
    posicaoY += 10;
    documento.setFontSize(10);
    documento.text(`Período: ${this.descricaoPeriodo()}`, 20, posicaoY);
    posicaoY += 12;

    if (this.receitas.length === 0) {
      documento.text('Nenhuma receita encontrada no período informado.', 20, posicaoY);
    } else {
      this.receitas.forEach((receita) => {
        if (posicaoY > 270) {
          documento.addPage();
          posicaoY = 20;
        }

        documento.setFontSize(12);
        documento.text(this.formatarData(receita.data), 20, posicaoY);
        posicaoY += 7;
        documento.setFontSize(10);
        receita.itens.forEach((item) => {
          documento.text(`- ${item.descricao}: ${this.formatarMoeda(item.valor)}`, 25, posicaoY);
          posicaoY += 5;
        });
        documento.text(`Total do dia: ${this.formatarMoeda(receita.total)}`, 25, posicaoY);
        posicaoY += 10;
      });

      documento.setFontSize(12);
      documento.text(`Receita total: ${this.formatarMoeda(this.totalReceitas)}`, 20, posicaoY);
    }

    documento.save('relatorio-receitas.pdf');
  }

  //checar se a conversão esta funcionando corretamente
  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  private obterData(valor: Date | string | undefined): Date | null {
    if (!valor) {
      return null;
    }
    if (valor instanceof Date) {
      return Number.isNaN(valor.getTime()) ? null : valor;
    }

    const partes = valor.includes('/') ? valor.split('/').map(Number) : valor.split('-').map(Number);
    if (partes.length !== 3 || partes.some(Number.isNaN)) {
      return null;
    }

    const [ano, mes, dia] = valor.includes('/')
      ? [partes[2], partes[1], partes[0]]
      : [partes[0], partes[1], partes[2]];
    const data = new Date(ano, mes - 1, dia);
    return data.getFullYear() === ano && data.getMonth() === mes - 1 && data.getDate() === dia ? data : null;
  }

  private noIntervalo(data: Date): boolean {
    const dataISO = this.formatarDataISO(data);
    return (!this.dataInicial || dataISO >= this.dataInicial) && (!this.dataFinal || dataISO <= this.dataFinal);
  }

  private formatarDataISO(data: Date): string {
    return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
  }

  formatarData(dataISO: string): string {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  private descricaoPeriodo(): string {
    return `${this.dataInicial ? this.formatarData(this.dataInicial) : 'início'} a ${this.dataFinal ? this.formatarData(this.dataFinal) : 'fim'}`;
  }
}
