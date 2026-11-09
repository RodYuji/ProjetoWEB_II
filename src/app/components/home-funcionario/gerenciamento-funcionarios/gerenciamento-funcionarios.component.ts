import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FuncionarioService } from '../../../shared/services/funcionario.service';
import { Funcionario } from '../../../shared/models/funcionario.model';
import { LoginService } from '../../../shared/services/login.service';

@Component({
  selector: 'app-gerenciamento-funcionarios',
  imports: [FormsModule],
  templateUrl: './gerenciamento-funcionarios.component.html',
  styleUrl: './gerenciamento-funcionarios.component.css',
})
export class GerenciamentoFuncionariosComponent implements OnInit {
  private funcionarioService = inject(FuncionarioService);

  funcionarios = signal<Funcionario[]>([]);

  modalAberto = false;
  modoEdicao = false;
  funcionarioForm = new Funcionario();

  modalExclusaoAberto = false;
  funcionarioParaExcluir: Funcionario | null = null;

  // Id do usuário logado (vem do login)
  private loginService = inject(LoginService);
  idFuncionarioLogado: number | undefined = this.loginService.usuarioLogado?.id;
  hoje: string = new Date().getFullYear() + '-'
    + String(new Date().getMonth() + 1).padStart(2, '0') + '-'
    + String(new Date().getDate()).padStart(2, '0');

  ngOnInit(): void {
    this.listarFuncionarios();
  }

  listarFuncionarios(): void {
    this.funcionarioService.listarTodos().subscribe(
      funcionarios => this.funcionarios.set(funcionarios)
    );
  }

  formatarData(data: string): string {
    if (!data) return '';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  abrirModal() {
    this.funcionarioForm = new Funcionario();
    this.modoEdicao = false;
    this.modalAberto = true;
  }

  editarFuncionario(funcionario: Funcionario) {
    // cópia para não alterar a linha da tabela antes de salvar; a senha vem vazia
    this.funcionarioForm = new Funcionario(funcionario.id, funcionario.nome, funcionario.email,
                                           funcionario.dataNascimento, '', funcionario.ativo);
    this.modoEdicao = true;
    this.modalAberto = true;
  }

  salvarFuncionario(form: NgForm) {
    if (form.invalid) {
      return;
    }
    
    if (this.funcionarioForm.dataNascimento > this.hoje) {
      alert('A data de nascimento não pode ser no futuro.');
      return;
    }
    const f = this.funcionarioForm;
    f.nome = f.nome.trim();
    f.email = f.email.trim();

    if (this.modoEdicao) {
      this.funcionarioService.alterar(f).subscribe({
        next: () => { this.modalAberto = false; this.listarFuncionarios(); },
        error: (err) => alert(
          err.status === 409 ? 'Já existe um usuário com esse e-mail.' :
          err.status === 400 ? 'Dados inválidos, confira os campos.' :
          'Erro ao alterar o funcionário.')
      });
    } else {
      this.funcionarioService.inserir(f).subscribe({
        next: () => { this.modalAberto = false; this.listarFuncionarios(); },
        error: (err) => alert(
          err.status === 409 ? 'Já existe um usuário com esse e-mail.' :
          err.status === 400 ? 'Dados inválidos, confira os campos.' :
          'Erro ao inserir o funcionário.')
      });
    }
  }

  cancelarModal() {
    this.modalAberto = false;
  }

  abrirModalExclusao(funcionario: Funcionario) {
    this.funcionarioParaExcluir = funcionario;
    this.modalExclusaoAberto = true;
  }

  confirmarExclusao() {
    if (this.funcionarioParaExcluir && this.idFuncionarioLogado) {
      this.funcionarioService.remover(this.funcionarioParaExcluir.id, this.idFuncionarioLogado).subscribe({
        next: () => this.listarFuncionarios(),
        error: (err) => alert(
          err.status === 400 ? 'Você não pode remover a si mesmo.' :
          err.status === 409 ? 'Não é possível remover o último funcionário.' :
          err.status === 412 ? 'Este funcionário tem solicitações redirecionadas para ele. É necessário concluir ou redirecionar essas solicitações antes de ser removido.' :
          'Erro ao remover o funcionário.')
      });
    }
    this.modalExclusaoAberto = false;
  }

  cancelarExclusao() {
    this.modalExclusaoAberto = false;
  }
}
