import { Routes } from '@angular/router';
import { HomeClienteComponent } from './components/home-cliente/home-cliente.component';
import { LoginComponent } from './components/login/login.component';
import { AutocadastroComponent } from './components/autocadastro/autocadastro.component';
import { HomeFuncionario } from './components/home-funcionario/home-funcionario';
import { EfetuarOrcamento } from './components/efetuar-orcamento/efetuar-orcamento';
import { VisualizarSolicitacao } from './components/visualizar-solicitacao/visualizar-solicitacao';

export const routes: Routes = [
  { path: '', component: HomeClienteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'autocadastro', component: AutocadastroComponent },
  { path: 'home-funcionario', component: HomeFuncionario },
  { path: 'efetuar-orcamento', component: EfetuarOrcamento },
  { path: 'visualizar-solicitacao', component: VisualizarSolicitacao },
  { path: '**', redirectTo: '' },
];