import { Component, ViewChild, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { NumericoDirective } from '../../shared/directives/numerico.directive';
import { Cliente } from '../../shared/models/cliente.model';


@Component({
  selector: 'app-autocadastro.component',
  imports: [RouterLink, FormsModule, NumericoDirective],
  templateUrl: './autocadastro.component.html',
  styleUrl: './autocadastro.component.css',
})


export class AutocadastroComponent {

  // Recebe uma referência do formulário aqui no componente
  // 'formCadastro' deve ser o nome do formulário no HTML
  @ViewChild('formCadastro') formCadastro!: NgForm;

  // Atributo de binding, os dados digitados no formulário vêm para este atributo
  // É um signal porque o endereço chega de forma assíncrona (ViaCEP)
  cliente = signal(new Cliente());

  private http = inject(HttpClient);
  private router = inject(Router);

  buscarEndereco(): void {

    // Remove pontos e traco deixando so os 8 dígitos
    const cepLimpo = this.cliente().cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      return;
    }

    this.http.get(`https://viacep.com.br/ws/${cepLimpo}/json/`).subscribe({
      next: (dados: any) => {
        if (dados.erro) {
          alert('CEP não encontrado.');
          return;
        }
        this.cliente.update(c => ({
          ...c,
          logradouro: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          uf: dados.uf
        }));
      },
      error: () => {
        alert('Erro ao consultar o CEP. Tente novamente.');
      }
    });
  }

  // Verifica se o formulário é válido e, se OK, redireciona para o login
  cadastrar(): void {
    if (this.formCadastro.form.valid) {
      // TODO: chamar o service de clientes (back-end) com this.cliente()
      this.router.navigate(['/login']);
    }
  }
}
