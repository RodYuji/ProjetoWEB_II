import { Component } from '@angular/core';
import {SolicitacaoCard} from "./solicitacao-card/solicitacao-card";

@Component({
  selector: 'app-home-cliente',
  imports: [SolicitacaoCard],
  templateUrl: './home-cliente.component.html',
  styleUrl: './home-cliente.component.css',
})
export class HomeClienteComponent {}