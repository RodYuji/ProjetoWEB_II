import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { jsPDF } from 'jspdf';
import { SolicitacaoService } from '../../../shared/services/solicitacao.service';

interface ReceitaCategoria {
  categoria: string;
  total: number;
  quantidade: number;
}

@Component({
  selector: 'app-relatorio-categoria',
  imports: [RouterLink],
  templateUrl: './relatorio-categoria.html',
  styleUrl: './relatorio-categoria.css',
})
export class RelatorioCategoria {
  categorias: ReceitaCategoria[] = [];
  totalReceitas = 0;

  constructor(private readonly solicitacaoService: SolicitacaoService) {
    this.carregarReceitas();
  }

  carregarReceitas(): void {
    const agrupado = new Map<string, { total: number; quantidade: number }>();

    this.solicitacaoService.listar()
      .filter((solicitacao) => solicitacao.estado === 'PAGA')
      .forEach((solicitacao) => {
        const categoria = solicitacao.categoriaEquipamento?.trim() || 'Sem categoria';
        const valor = Number((solicitacao as any).valor ?? solicitacao.valorOrcamento ?? 0);

        const atual = agrupado.get(categoria) ?? { total: 0, quantidade: 0 };
        atual.total += valor;
        atual.quantidade += 1;
        agrupado.set(categoria, atual);
      });

    this.categorias = [...agrupado.entries()]
      .map(([categoria, dados]) => ({ categoria, total: dados.total, quantidade: dados.quantidade }))
      .sort((a, b) => b.total - a.total);

    this.totalReceitas = this.categorias.reduce((total, categoria) => total + categoria.total, 0);
  }

  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  gerarPdf(): void {
    const documento = new jsPDF();
    let posicaoY = 20;

    documento.setFontSize(18);
    documento.text('Receita por categoria', 20, posicaoY);
    posicaoY += 12;

    if (this.categorias.length === 0) {
      documento.setFontSize(11);
      documento.text('Nenhuma receita paga registrada para categorias.', 20, posicaoY);
    } else {
      this.categorias.forEach((categoria) => {
        if (posicaoY > 270) {
          documento.addPage();
          posicaoY = 20;
        }

        documento.setFontSize(11);
        documento.text(`${categoria.categoria}: ${this.formatarMoeda(categoria.total)}`, 20, posicaoY);
        posicaoY += 7;
        documento.text(`Quantidade: ${categoria.quantidade}`, 25, posicaoY);
        posicaoY += 10;
      });

      documento.setFontSize(12);
      documento.text(`Total geral: ${this.formatarMoeda(this.totalReceitas)}`, 20, posicaoY);
    }

    documento.save('receita-por-categoria.pdf');
  }
}
