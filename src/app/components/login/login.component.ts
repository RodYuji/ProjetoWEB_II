import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';
import { Login } from '../../shared/models/login.model';
import { Usuario } from '../../shared/models/usuario.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Referência ao formulário do HTML 
  @ViewChild('formLogin') formLogin!: NgForm;

  // Dados digitados na tela 
  login: Login = new Login();
  loading = signal(false);
  message = signal('');

  enviado = signal(false);

  private loginService = inject(LoginService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const usu = this.loginService.usuarioLogado;
    if (usu) {
      this.irParaHome(usu);
    }
    else {
      // Mensagem enviada pelo guard
      this.route.queryParams.subscribe(params => {
        this.message.set(params['error'] ?? '');
      });
    }
  }

  logar(): void {
    this.enviado.set(true);   // passa a mostrar os avisos dos campos que faltam
    this.loading.set(true);
    if (this.formLogin.form.valid) {
      this.loginService.login(this.login).subscribe({
        next: (usu) => {
          if (usu != null) {
            this.loginService.usuarioLogado = usu;   // grava no localStorage
            this.loading.set(false);
            this.irParaHome(usu);
          }
          else {
            this.loading.set(false);
            this.message.set("E-mail/Senha inválidos.");
          }
        },
        error: (err) => {
          this.loading.set(false);
          this.message.set(`Erro efetuando login: ${err.message}`);
        }
      });
    }
    else {
      this.loading.set(false);
    }
  }

  // o sistema identifica o perfil e manda para a página inicial dele
  private irParaHome(usu: Usuario): void {
    if (usu.perfil == "FUNCIONARIO")
      this.router.navigate(["/home-funcionario"]);   
    else
      this.router.navigate(["/home-cliente"]);       
  }
}