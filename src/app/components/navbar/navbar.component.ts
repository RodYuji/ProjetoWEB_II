import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';
import { Usuario } from '../../shared/models/usuario.model';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private loginService = inject(LoginService);
  private router = inject(Router);

  // Usuário logado
  get usuarioLogado(): Usuario | null {
    return this.loginService.usuarioLogado;
  }

  // Sai do sistema e volta para o login
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}