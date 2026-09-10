import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-autocadastro.component',
  imports: [RouterLink, FormsModule],
  templateUrl: './autocadastro.component.html',
  styleUrl: './autocadastro.component.css',
})


export class AutocadastroComponent {

  cep = '';

  endereco = {
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: ''
  };

  constructor(private http: HttpClient) {}

  buscarEndereco(): void {

    // Remove pontos e traco deixando so os 8 dígitos
    const cepLimpo = this.cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      return;
    }

    this.http.get(`https://viacep.com.br/ws/${cepLimpo}/json/`).subscribe({
      next: (dados: any) => {
        if (dados.erro) {
          alert('CEP não encontrado.');
          return;
        }
        this.endereco.logradouro = dados.logradouro;
        this.endereco.bairro = dados.bairro;
        this.endereco.cidade = dados.localidade;
        this.endereco.uf = dados.uf;
      },
      error: () => {
        alert('Erro ao consultar o CEP. Tente novamente.');
      }
    });
  }
}

