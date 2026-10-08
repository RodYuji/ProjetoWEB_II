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
    const espacamentoPx = 40;
    const espacamentoInformacoes = espacamentoPx * 0.75;
    const distanciaLinhaCategoriaPx = 10;
    const distanciaLinhaCategoria = distanciaLinhaCategoriaPx * 0.75;
    const larguraPagina = documento.internal.pageSize.getWidth();
    const alturaPagina = documento.internal.pageSize.getHeight();
    const limiteInferior = alturaPagina - 48;
    const dataEmissao = obterDataHoraAtual();
    let posicaoY = 0;

    const desenharCabecalho = (): void => {
      documento.setFillColor(18, 80, 113);
      documento.rect(0, 0, larguraPagina, 76, 'F');
      documento.setTextColor(255, 255, 255);
      documento.setFontSize(18);
      documento.text(this.nomeEmpresa, margem, 30);
      documento.setFontSize(10);
      documento.text('Resumo financeiro por categoria', margem, 48);
      documento.text(`Emitido em ${dataEmissao}`, margem, 62);
      documento.setTextColor(27, 27, 27);
      posicaoY = 96;
    };

    const garantirEspaco = (alturaNecessaria: number): void => {
      if (posicaoY + alturaNecessaria > limiteInferior) {
        documento.addPage();
        desenharCabecalho();
      }
    };

    desenharCabecalho();

    const totalProdutos = this.categorias.reduce((total, categoria) => total + categoria.quantidade, 0);
    const categoriaDestaque = this.categorias[0] ?? null;
    const mediaCategoria = this.categorias.length > 0 ? this.totalReceitas / this.categorias.length : 0;

    documento.setFillColor(245, 248, 251);
    documento.rect(margem, posicaoY, larguraPagina - margem * 2, 96, 'F');
    documento.setDrawColor(203, 213, 225);
    documento.rect(margem, posicaoY, larguraPagina - margem * 2, 96);

    documento.setFontSize(10);
    documento.setTextColor(86, 96, 108);
    documento.text('Receita total', margem + 18, posicaoY + 20);
    documento.setFontSize(12);
    documento.setTextColor(17, 24, 39);
    documento.text(this.formatarMoeda(this.totalReceitas), margem + 18, posicaoY + 38);

    documento.setFontSize(10);
    documento.setTextColor(86, 96, 108);
    documento.text('Média por categoria', margem + 270, posicaoY + 20);
    documento.setFontSize(12);
    documento.setTextColor(17, 24, 39);
    documento.text(this.formatarMoeda(mediaCategoria), margem + 270, posicaoY + 38);

    documento.setFontSize(10);
    documento.setTextColor(86, 96, 108);
    documento.text('Serviços pagos', margem + 18, posicaoY + 62);
    documento.setFontSize(12);
    documento.setTextColor(17, 24, 39);
    documento.text(String(totalProdutos), margem + 18, posicaoY + 80);

    documento.setFontSize(10);
    documento.setTextColor(86, 96, 108);
    documento.text('Categoria principal', margem + 270, posicaoY + 62);
    documento.setFontSize(11);
    documento.setTextColor(17, 24, 39);
    const nomeCategoriaDestaque = categoriaDestaque ? categoriaDestaque.categoria : 'Sem registros';
    const linhasCategoriaDestaque = documento.splitTextToSize(nomeCategoriaDestaque, 220);
    documento.text(linhasCategoriaDestaque[0], margem + 270, posicaoY + 80);

    posicaoY += 122;

    if (this.categorias.length === 0) {
      garantirEspaco(24);
      documento.setFontSize(12);
      documento.text('Nenhuma receita paga registrada para categorias.', margem, posicaoY + 12);
      posicaoY += 24;
    } else {
      garantirEspaco(24);
      documento.setFont('helvetica', 'bold');
      documento.setFontSize(16);
      documento.text('DETALHAMENTO POR CATEGORIA', margem, posicaoY + 12);
      posicaoY += espacamentoInformacoes;

      this.categorias.forEach((categoria) => {
        const percentual = this.totalReceitas > 0 ? (categoria.total / this.totalReceitas) * 100 : 0;
        const linhasNome = documento.splitTextToSize(categoria.categoria, larguraPagina - margem * 2 - 18);
        garantirEspaco(28);

        documento.setFontSize(12);
        documento.setTextColor(9, 97, 145);
        linhasNome.forEach((linha: string) => {
          garantirEspaco(espacamentoInformacoes);
          documento.text(linha, margem, posicaoY);
          posicaoY += espacamentoInformacoes;
        });

        garantirEspaco(espacamentoInformacoes);
        documento.setFontSize(10);
        documento.setTextColor(76, 85, 95);
        documento.text(`${categoria.quantidade} serviços`, margem + 8, posicaoY);
        documento.text(`${percentual.toFixed(1)}% do total`, margem + 180, posicaoY);
        documento.setTextColor(17, 24, 39);
        documento.text(this.formatarMoeda(categoria.total), larguraPagina - margem, posicaoY, { align: 'right' });

        documento.setDrawColor(220, 228, 235);
        documento.line(
          margem,
          posicaoY + distanciaLinhaCategoria,
          larguraPagina - margem,
          posicaoY + distanciaLinhaCategoria,
        );
        posicaoY += espacamentoInformacoes;
      });

      const linhasDestaque = categoriaDestaque
        ? documento.splitTextToSize(
          `Categoria principal: ${categoriaDestaque.categoria} (${this.formatarMoeda(categoriaDestaque.total)})`,
          larguraPagina - margem * 2,
        )
        : [];
      garantirEspaco(categoriaDestaque ? 18 + linhasDestaque.length * 16 : 24);
      documento.setFontSize(12);
      documento.setTextColor(17, 24, 39);
      documento.text(`Total geral: ${this.formatarMoeda(this.totalReceitas)}`, margem, posicaoY + 12);
      posicaoY += 18;
      if (categoriaDestaque) {
        linhasDestaque.forEach((linha: string) => {
          garantirEspaco(16);
          documento.text(linha, margem, posicaoY + 12);
          posicaoY += 16;
        });
      }
    }

    const totalPaginas = documento.getNumberOfPages();
    for (let pagina = 1; pagina <= totalPaginas; pagina += 1) {
      documento.setPage(pagina);
      documento.setFontSize(9);
      documento.setTextColor(100, 116, 139);
      documento.text(`Documento gerado em ${dataEmissao}.`, margem, alturaPagina - 22);
      documento.text(`Página ${pagina} de ${totalPaginas}`, larguraPagina - margem, alturaPagina - 22, { align: 'right' });
    }

    documento.save('receita-por-categoria.pdf');
  }
}
