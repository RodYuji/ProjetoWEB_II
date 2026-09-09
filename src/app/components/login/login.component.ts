import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  email = ['rodrigo@gmail.com', 'fernando@gmail.com', 'gabriel@gmail.com', 'arhtur@gmail.com', 'carlos@gmail.com'];
  senha = '1234';

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    console.log('Email:', this.f['email'].value);
    console.log('Senha:', this.f['password'].value);
    alert('Login realizado com sucesso!');
    window.location.href = '/home-cliente';
  }
}