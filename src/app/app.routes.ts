import { Routes } from '@angular/router';
import { HomeClienteComponent } from './components/home-cliente/home-cliente.component';
import { LoginComponent } from './components/login/login.component';
import { AutocadastroComponent } from './components/autocadastro/autocadastro.component';
import { HomeFuncionario } from './components/home-funcionario/home-funcionario';
import { EfetuarOrcamento } from './components/home-funcionario/efetuar-orcamento/efetuar-orcamento';
import { NovaSolicitacao } from './components/home-cliente/nova-solicitacao/nova-solicitacao';
import { EfetuarManutencao } from './components/home-funcionario/efetuar-manutencao/efetuar-manutencao';
import { DetalhesSolicitacao } from './components/home-cliente/detalhes-solicitacao/detalhes-solicitacao';
import { Orcamento } from './components/home-cliente/orcamento/orcamento';
import { Pagamento } from './components/home-cliente/pagamento/pagamento';
import { RelatorioReceitas } from './components/home-funcionario/relatorio-receitas/relatorio-receitas';
import { RelatorioCategoria } from './components/home-funcionario/relatorio-categoria/relatorio-categoria';
import { VisualizarSolicitacao } from './components/home-funcionario/visualizar-solicitacao/visualizar-solicitacao';
import { GerenciamentoFuncionariosComponent } from './components/home-funcionario/gerenciamento-funcionarios/gerenciamento-funcionarios.component';
import { GerenciamentoCategoriasComponent } from './components/home-funcionario/gerenciamento-categorias/gerenciamento-categorias.component';
import { authGuard } from './auth/auth.guard';

// nome: como a tela aparece nas mensagens do guard 
const CLIENTE = { role: 'CLIENTE' };
const FUNCIONARIO = { role: 'FUNCIONARIO' };

export const routes: Routes = [
  // Públicas sem canActivate 
  { path: '', component: AutocadastroComponent },
  { path: 'autocadastro', component: AutocadastroComponent },
  { path: 'login', component: LoginComponent },

  // Perfil CLIENTE
  { path: 'home-cliente', component: HomeClienteComponent, canActivate: [authGuard], data: { ...CLIENTE, nome: 'home do cliente' } },
  { path: 'nova-solicitacao', component: NovaSolicitacao, canActivate: [authGuard], data: { ...CLIENTE, nome: 'nova solicitação' } },
  { path: 'detalhes-solicitacao/:id', component: DetalhesSolicitacao, canActivate: [authGuard], data: { ...CLIENTE, nome: 'detalhes da solicitação' } },
  { path: 'orcamento/:id', component: Orcamento, canActivate: [authGuard], data: { ...CLIENTE, nome: 'orçamento' } },
  { path: 'pagamento/:id', component: Pagamento, canActivate: [authGuard], data: { ...CLIENTE, nome: 'pagamento' } },

  // Perfil FUNCIONARIO
  { path: 'home-funcionario', component: HomeFuncionario, canActivate: [authGuard], data: { ...FUNCIONARIO, nome: 'home do funcionário' } },
  { path: 'efetuar-orcamento', component: EfetuarOrcamento, canActivate: [authGuard], data: { ...FUNCIONARIO, nome: 'efetuar orçamento' } },
  { path: 'efetuar-orcamento/:id', component: EfetuarOrcamento, canActivate: [authGuard], data: { ...FUNCIONARIO, nome: 'efetuar orçamento' } },
  { path: 'efetuar-manutencao/:id', component: EfetuarManutencao, canActivate: [authGuard], data: { ...FUNCIONARIO, nome: 'efetuar manutenção' } },
  { path: 'visualizar-solicitacao', component: VisualizarSolicitacao, canActivate: [authGuard], data: { ...FUNCIONARIO, nome: 'visualização de solicitações' } },
  { path: 'relatorio-receitas', component: RelatorioReceitas, canActivate: [authGuard], data: { ...FUNCIONARIO, nome: 'relatório de receitas' } },
  { path: 'relatorio-categoria', component: RelatorioCategoria, canActivate: [authGuard], data: { ...FUNCIONARIO, nome: 'relatório por categoria' } },
  { path: 'gerenciamento-funcionarios', component: GerenciamentoFuncionariosComponent, canActivate: [authGuard], data: { ...FUNCIONARIO, nome: 'gerenciamento de funcionários' } },
  { path: 'gerenciamento-categorias', component: GerenciamentoCategoriasComponent, canActivate: [authGuard], data: { ...FUNCIONARIO, nome: 'gerenciamento de categorias' } },

  // Qualquer outro endereço volta para o início
  { path: '**', redirectTo: '' },
];
