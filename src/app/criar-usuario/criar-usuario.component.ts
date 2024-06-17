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
  selector: 'app-criar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css',
})
export class CriarUsuarioComponent {
  //atributos
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  //método construtor
  constructor(private httpClient: HttpClient) {}

  //criando um formulário
  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
    senhaConfirmacao: new FormControl('', [Validators.required]),
  });

  //função para verificar as validações dos campos
  get f() {
    return this.form.controls;
  }

  //função para capturar o submit do formulário
  onSubmit() {
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    if (this.form.value.senha != this.form.value.senhaConfirmacao) {
      this.mensagemErro = 'Senhas não conferem, por favor verifique.';
    } else {
      this.httpClient
        .post('http://localhost:5272/api/usuarios/criar', this.form.value)
        .subscribe({
          next: (data: any) => {
            this.mensagemSucesso = data.message;
            this.form.reset();
          },
          error: (e) => {
            this.mensagemErro = e.error.message;
          },
        });
    }
  }
}
