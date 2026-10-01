import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';
import { jsPDF } from 'jspdf'; //import the serviço nativo do JS para exportar PDF
import { RouterLink } from '@angular/router';

interface ReceitaDiaria {
  data: string;
  itens: { descricao: string; valor: number }[];
  total: number;
}

export function obterDataHoraAtual(): string {
  return new Date().toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

@Component({
  selector: 'app-relatorio-receitas',
  imports: [FormsModule, RouterLink],
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

  private readonly nomeEmpresa = 'Oficina de Manutenção e Serviços';
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

    this.solicitacoes
      .filter((solicitacao) => solicitacao.estado === 'PAGA' || solicitacao.status === 'PAGA')
      .forEach((solicitacao) => {
        const dataRaw = solicitacao.dataPagamento ?? solicitacao.data ?? solicitacao.dataHora;
        const data = this.obterData(dataRaw);
        if (!data || !this.noIntervalo(data)) {
          return;
        }

        const chave = this.formatarDataISO(data);
        const itens = receitasPorDia.get(chave) ?? [];
        const valor = Number(solicitacao.valor ?? solicitacao.valorOrcamento ?? 0);

        itens.push({
          descricao: solicitacao.equipamento ?? solicitacao.descricaoEquipamento ?? solicitacao.descricao ?? 'Serviço de manutenção',
          valor,
        });
        receitasPorDia.set(chave, itens);
      });

    this.receitas = [...receitasPorDia.entries()]
      .sort(([dataA], [dataB]) => dataA.localeCompare(dataB))
      .map(([data, itens]) => ({
        data,
        itens,
        total: itens.reduce((total, item) => total + item.valor, 0),
      }));
    this.totalReceitas = this.receitas.reduce((total, receita) => total + receita.total, 0);
  }

  gerarPdf(): void {
    const documento = new jsPDF({ unit: 'pt', format: 'a4' });
    const margem = 42;
    const larguraPagina = documento.internal.pageSize.getWidth();
    const alturaPagina = documento.internal.pageSize.getHeight();
    let posicaoY = 78;

    documento.setFillColor(8, 77, 115);
    documento.rect(0, 0, larguraPagina, 76, 'F');
    documento.setTextColor(255, 255, 255);
    documento.setFontSize(18);
    documento.text(this.nomeEmpresa, margem, 28);
    documento.setFontSize(10);
    documento.text('Relatório financeiro de receitas', margem, 48);
    documento.text(`Emitido em ${this.obterDataHoraAtual()}`, margem, 62);
    documento.setTextColor(30, 30, 30);

    const totalServicos = this.receitas.reduce((total, receita) => total + receita.itens.length, 0);
    const mediaDiaria = this.receitas.length > 0 ? this.totalReceitas / this.receitas.length : 0;
    const melhorDia = this.receitas.reduce<{ data: string; total: number } | null>((maior, receita) => {
      if (!maior || receita.total > maior.total) {
        return { data: receita.data, total: receita.total };
      }
      return maior;
    }, null);

    documento.setFillColor(244, 247, 250);
    documento.rect(margem, 92, larguraPagina - margem * 2, 70, 'F');
    documento.setDrawColor(202, 214, 224);
    documento.rect(margem, 92, larguraPagina - margem * 2, 70);

    documento.setFontSize(10);
    documento.setTextColor(80, 90, 105);
    documento.text('Período', margem + 16, 116);
    documento.setFontSize(12);
    documento.setTextColor(17, 24, 39);
    documento.text(this.descricaoPeriodo(), margem + 16, 134);

    documento.setFontSize(10);
    documento.setTextColor(80, 90, 105);
    documento.text('Receita total', margem + 210, 116);
    documento.setFontSize(12);
    documento.setTextColor(17, 24, 39);
    documento.text(this.formatarMoeda(this.totalReceitas), margem + 210, 134);

    documento.setFontSize(10);
    documento.setTextColor(80, 90, 105);
    documento.text('Média por dia', margem + 330, 116);
    documento.setFontSize(12);
    documento.setTextColor(17, 24, 39);
    documento.text(this.formatarMoeda(mediaDiaria), margem + 330, 134);

    documento.setFontSize(10);
    documento.setTextColor(80, 90, 105);
    documento.text('Serviços pagos', margem + 430, 116);
    documento.setFontSize(12);
    documento.setTextColor(17, 24, 39);
    documento.text(String(totalServicos), margem + 430, 134);

    posicaoY = 188;

    if (this.receitas.length === 0) {
      documento.setFontSize(12);
      documento.text('Nenhuma receita encontrada no período informado.', margem, posicaoY);
    } else {
      documento.setFontSize(12);
      documento.setTextColor(17, 24, 39);
      documento.text('Detalhamento por dia', margem, posicaoY);
      posicaoY += 18;

      this.receitas.forEach((receita) => {
        if (posicaoY > 720) {
          documento.addPage();
          posicaoY = 60;
        }

        documento.setDrawColor(218, 226, 234);
        documento.line(margem, posicaoY - 6, larguraPagina - margem, posicaoY - 6);

        documento.setFontSize(12);
        documento.setTextColor(8, 77, 115);
        documento.text(this.formatarData(receita.data), margem, posicaoY);
        documento.setFontSize(10);
        documento.setTextColor(75, 85, 99);
        documento.text(`Total do dia: ${this.formatarMoeda(receita.total)}`, margem + 300, posicaoY);
        posicaoY += 18;

        documento.setTextColor(20, 20, 20);
        receita.itens.forEach((item) => {
          const descricao = `• ${item.descricao} — ${this.formatarMoeda(item.valor)}`;
          const linhas = documento.splitTextToSize(descricao, 500);

          linhas.forEach((linha: string) => {
            if (posicaoY > 760) {
              documento.addPage();
              posicaoY = 60;
            }
            documento.text(linha, margem + 18, posicaoY);
            posicaoY += 14;
          });
        });

        posicaoY += 12;
      });

      documento.setFontSize(12);
      documento.setTextColor(17, 24, 39);
      documento.text(`Receita total do período: ${this.formatarMoeda(this.totalReceitas)}`, margem, posicaoY + 12);
      if (melhorDia) {
        documento.text(`Maior faturamento: ${this.formatarData(melhorDia.data)} (${this.formatarMoeda(melhorDia.total)})`, margem + 250, posicaoY + 12);
      }
    }

    documento.setFontSize(9);
    documento.setTextColor(100, 116, 139);
    documento.text('Documento gerado pelo sistema de gestão da oficina.', margem, alturaPagina - 22);
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

  public obterDataHoraAtual(): string {
    return obterDataHoraAtual();
  }

  private descricaoPeriodo(): string {
    return `${this.dataInicial ? this.formatarData(this.dataInicial) : 'início'} a ${this.dataFinal ? this.formatarData(this.dataFinal) : 'fim'}`;
  }
}
