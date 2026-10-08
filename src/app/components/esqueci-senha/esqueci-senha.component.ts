import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-esquecer-senha',
  imports: [ReactiveFormsModule, ReactiveFormsModule, RouterLink], 
  templateUrl: './esqueci-senha.component.html',
  styleUrl: './esqueci-senha.component.css',
})
export class EsquecerSenhaComponent {
  emailEnviado = false;
  private formBuilder = inject(FormBuilder);

  recuperarForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });

  get email() {
    return this.recuperarForm.controls.email;
  }

  onSubmit() {
    if (this.recuperarForm.valid) {
      this.emailEnviado = true;
    }
  }
}