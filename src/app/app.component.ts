import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  //atributos
  isAuthenticated: boolean = false;
  nomeUsuario: string = '';
  emailUsuario: string = '';

  //função executada quando a página é carregada
  ngOnInit(): void {
    //ler os dados gravados na local storage
    let auth = localStorage.getItem('auth');

    //verificar se existe um usuário autenticado
    if (auth != null) {
      this.isAuthenticated = true;

      //converter os dados em JSON
      let data = JSON.parse(auth);

      //capturando o nome e o email do usuário
      this.nomeUsuario = data.response.nome;
      this.emailUsuario = data.response.email;
    }
  }

  //função para fazer o logout do usuário
  logout(): void {
    if (confirm('Deseja realmente sair do sistema?')) {
      //apagar os dados gravados na local storage
      localStorage.removeItem('auth');

      //redirecionar o usuário de volta para a página inicial do sistema
      location.href = '/';
    }
  }
}
