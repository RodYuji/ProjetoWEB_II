import { Component, ViewChild, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { NumericoDirective } from '../../shared/directives/numerico.directive';
import { MascaraDirective } from '../../shared/directives/mascara.directive';
import { Cliente } from '../../shared/models/cliente.model';
import { ClienteService } from '../../shared/services/cliente.service';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-autocadastro.component',
  imports: [RouterLink, FormsModule, NumericoDirective, MascaraDirective],
  templateUrl: './autocadastro.component.html',
  styleUrl: './autocadastro.component.css',
})


export class AutocadastroComponent {

  // Recebe uma referência do formulário aqui no componente
  @ViewChild('formCadastro') formCadastro!: NgForm;

  // Atributo de binding, os dados digitados no formulário vêm para este atributo
  // É um signal porque o endereço chega de forma assíncrona (ViaCEP)
  cliente = signal(new Cliente());

  private http = inject(HttpClient);
  private router = inject(Router);
  private clienteService = inject(ClienteService);
  private loginService = inject(LoginService);

  message = signal('');
  loading = signal(false);

  enviado = signal(false);

  modalSucesso = signal(false);
  emailCadastrado = signal('');

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

  cadastrar(): void {
    this.enviado.set(true);   // passa a mostrar os avisos dos campos que faltam
    if (this.formCadastro.form.valid) {
      this.loading.set(true);
      this.message.set('');
      this.clienteService.autocadastro(this.cliente()).subscribe({
        next: (cli) => {
          this.loading.set(false);
          if (cli != null) {
            this.emailCadastrado.set(cli.email);
            this.modalSucesso.set(true);
          }
          else {
            this.message.set('Não foi possível concluir o cadastro.');
          }
        },
        error: (err) => {
          this.loading.set(false);
          if (err.status == 409) {
            this.message.set('CPF ou e-mail já cadastrado.');
          }
          else if (err.status == 400) {
            this.message.set('Dados inválidos. Confira os campos e tente novamente.');
          }
          else {
            this.message.set(`Erro ao cadastrar: ${err.message}`);
          }
        }
      });
    }
  }

  // Botão do modal de sucesso
  irParaLogin(): void {
    this.modalSucesso.set(false);
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
