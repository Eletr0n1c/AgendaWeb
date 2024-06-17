import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-usuario.component.html',
  styleUrl: './login-usuario.component.css',
})
export class LoginUsuarioComponent {
  //atributos
  mensagemErro: string = '';

  //construtor
  constructor(private httpClient: HttpClient) {}

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
  });

  get f() {
    return this.formLogin.controls;
  }

  onSubmit() {
    this.httpClient
      .post(
        'http://localhost:5272/api/usuarios/autenticar',
        this.formLogin.value
      )
      .subscribe({
        next: (data: any) => {
          //gravar os dados obtidos da API em local storage
          localStorage.setItem('auth', JSON.stringify(data));
          //redirecionar o usuário para a página de usuário
          location.href = '/manter-tarefas';
        },
        error: (e) => {
          this.mensagemErro = e.error.message;
        },
      });
  }
}
