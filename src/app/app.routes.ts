import { Routes } from '@angular/router';
import { HomeClienteComponent } from './components/home-cliente/home-cliente.component';
import { LoginComponent } from './components/login/login.component';
import { AutocadastroComponent } from './components/autocadastro/autocadastro.component';
import { DetalhesSolicitacao } from './components/home-cliente/detalhes-solicitacao/detalhes-solicitacao';

export const routes: Routes = [
  { path: '', component: HomeClienteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'autocadastro', component: AutocadastroComponent },
  { path: 'detalhes-solicitacao/:id', component: DetalhesSolicitacao },
  { path: '**', redirectTo: '' }
];