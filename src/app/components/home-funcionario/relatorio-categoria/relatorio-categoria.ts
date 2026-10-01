import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { jsPDF } from 'jspdf';
import { obterDataHoraAtual } from '../relatorio-receitas/relatorio-receitas';
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

  private readonly nomeEmpresa = 'Oficina de Manutenção e Serviços';

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
    const documento = new jsPDF({ unit: 'pt', format: 'a4' });
    const margem = 42;
    const larguraPagina = documento.internal.pageSize.getWidth();
    const alturaPagina = documento.internal.pageSize.getHeight();
    let posicaoY = 78;

    documento.setFillColor(18, 80, 113);
    documento.rect(0, 0, larguraPagina, 76, 'F');
    documento.setTextColor(255, 255, 255);
    documento.setFontSize(18);
    documento.text(this.nomeEmpresa, margem, 30);
    documento.setFontSize(10);
    documento.text('Resumo financeiro por categoria', margem, 48);
    documento.text(`Emitido em ${new Date().toLocaleString('pt-BR')}`, margem, 62);
    documento.setTextColor(27, 27, 27);

    const totalProdutos = this.categorias.reduce((total, categoria) => total + categoria.quantidade, 0);
    const categoriaDestaque = this.categorias[0] ?? null;
    const mediaCategoria = this.categorias.length > 0 ? this.totalReceitas / this.categorias.length : 0;

    documento.setFillColor(245, 248, 251);
    documento.rect(margem, 92, larguraPagina - margem * 2, 70, 'F');
    documento.setDrawColor(203, 213, 225);
    documento.rect(margem, 92, larguraPagina - margem * 2, 70);

    documento.setFontSize(10);
    documento.setTextColor(86, 96, 108);
    documento.text('Receita total', margem + 18, 116);
    documento.setFontSize(12);
    documento.setTextColor(17, 24, 39);
    documento.text(this.formatarMoeda(this.totalReceitas), margem + 18, 134);

    documento.setFontSize(10);
    documento.setTextColor(86, 96, 108);
    documento.text('Média por categoria', margem + 190, 116);
    documento.setFontSize(12);
    documento.setTextColor(17, 24, 39);
    documento.text(this.formatarMoeda(mediaCategoria), margem + 190, 134);

    documento.setFontSize(10);
    documento.setTextColor(86, 96, 108);
    documento.text('Serviços pagos', margem + 350, 116);
    documento.setFontSize(12);
    documento.setTextColor(17, 24, 39);
    documento.text(String(totalProdutos), margem + 350, 134);

    documento.setFontSize(10);
    documento.setTextColor(86, 96, 108);
    documento.text('Categoria principal', margem + 440, 116);
    documento.setFontSize(11);
    documento.setTextColor(17, 24, 39);
    documento.text(categoriaDestaque ? categoriaDestaque.categoria : 'Sem registros', margem + 440, 134);

    posicaoY = 188;

    if (this.categorias.length === 0) {
      documento.setFontSize(12);
      documento.text('Nenhuma receita paga registrada para categorias.', margem, posicaoY);
    } else {
      documento.setFontSize(12);
      documento.text('Detalhamento por categoria', margem, posicaoY);
      posicaoY += 18;

      this.categorias.forEach((categoria) => {
        if (posicaoY > 720) {
          documento.addPage();
          posicaoY = 60;
        }

        const percentual = this.totalReceitas > 0 ? (categoria.total / this.totalReceitas) * 100 : 0;

        documento.setDrawColor(220, 228, 235);
        documento.line(margem, posicaoY - 8, larguraPagina - margem, posicaoY - 8);

        documento.setFontSize(12);
        documento.setTextColor(9, 97, 145);
        documento.text(categoria.categoria, margem, posicaoY);
        documento.setFontSize(10);
        documento.setTextColor(76, 85, 95);
        documento.text(`${categoria.quantidade} serviços`, margem + 300, posicaoY);
        documento.text(`${percentual.toFixed(1)}% do total`, margem + 420, posicaoY);
        documento.setTextColor(17, 24, 39);
        documento.text(this.formatarMoeda(categoria.total), margem + 500, posicaoY);
        posicaoY += 22;
      });

      documento.setFontSize(12);
      documento.setTextColor(17, 24, 39);
      documento.text(`Total geral: ${this.formatarMoeda(this.totalReceitas)}`, margem, posicaoY + 16);
      if (categoriaDestaque) {
        documento.text(`Categoria principal: ${categoriaDestaque.categoria} (${this.formatarMoeda(categoriaDestaque.total)})`, margem + 250, posicaoY + 16);
      }
    }

    documento.setFontSize(9);
    documento.setTextColor(100, 116, 139);
    documento.text('Documento gerado ' + obterDataHoraAtual() + '.', margem, alturaPagina - 22);
    documento.save('receita-por-categoria.pdf');
  }
}
