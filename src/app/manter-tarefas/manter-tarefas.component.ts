import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-manter-tarefas',
  standalone: true,
  imports: [
    FormsModule, //biblioteca de formulários do Angular
    ReactiveFormsModule, //biblioteca de formulários do Angular
    CommonModule //biblioteca de funções básicas do Angular
  ],
  templateUrl: './manter-tarefas.component.html',
  styleUrl: './manter-tarefas.component.css'
})
export class ManterTarefasComponent {

  //variável para armazenar o endereço da API
  endpoint: string = 'http://localhost:5198/api/tarefas/';

  //variável para armazenar os dados obtidos da API
  tarefas: any[] = []; //array de objetos

  //variável para exibir mensagem de sucesso ao cadastrar uma tarefa
  mensagemCadastro: string = '';

  //objeto para capturar os campos do formulário de consulta
  formConsulta = new FormGroup({      
    dataInicio : new FormControl('', [Validators.required]), //campo data de início
    dataFim : new FormControl('', [Validators.required]) //campo data de fim
  });

  //objeto para capturar os campos do formulário de cadastro
  formCadastro = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
    descricao : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
    dataHora : new FormControl('', [Validators.required]),
    prioridade : new FormControl('', [Validators.required])
  });

  //objeto para capturar os campos do formulário de edição
  formEdicao = new FormGroup({
    id : new FormControl(''),
    nome : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
    descricao : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
    dataHora : new FormControl('', [Validators.required]),
    prioridade : new FormControl('', [Validators.required])
  });

  //função auxiliar para que possamos exivir as
  //mensagens de erro de validação do formConsulta
  get fConsulta() {
    return this.formConsulta.controls;
  }

  //função auxiliar para que possamos exibir as
  //mensagens de erro de validação do formCadastro
  get fCadastro() {
    return this.formCadastro.controls;
  } 

  //função auxiliar para que possamos exibir as
  //mensagens de erro de validação do formEdicao
  get fEdicao() {
    return this.formEdicao.controls;
  } 

  //método construtor
  constructor(
    private httpClient : HttpClient
  ) {}

  //função para executar a pesquisa de tarefas
  pesquisarTarefas() : void {
    
    //capturar as datas preenchidas em variáveis
    const dataInicio = this.formConsulta.value.dataInicio;
    const dataFim = this.formConsulta.value.dataFim;

    //fazendo a requisição para a API GET: /api/tarefas
    this.httpClient
      .get(this.endpoint + dataInicio + "/" + dataFim)
      .subscribe({ //aguardando a resposta da API
        next: (dados) => { //capturando resposta de sucesso
          //armazenar na variável do componente os dados obtidos da API
          this.tarefas = dados as any[];
        },
        error: (e) => { //capturando resposta de erro
          console.log(e.error);
        }
      });
  }

  //função para executar o cadastro da tarefa
  cadastrarTarefa() : void {
    
    //requisição POST para a API cadastrar a tarefa
    this.httpClient.post(this.endpoint, this.formCadastro.value)
      .subscribe({ //aguardando a resposta da API
        next: (data) => { //capturando a resposta de sucesso
          console.log(data);
          this.mensagemCadastro = 'Tarefa cadastrada com sucesso.';
          this.formCadastro.reset(); //limpar o formulário
        },
        error: (e) => { //capturando a resposta de erro
          console.log(e.error);
        }
      });
  }

  //função para excluir a tarefa
  excluirTarefa(id: string) : void {
    //pedindo confirmação do usuário
    if(confirm('Deseja realmente excluir a tarefa selecionada?')) {

      //excluindo a tarefa
      this.httpClient.delete(this.endpoint + id)
        .subscribe({
          next: (data: any) => { //capturando a resposta de sucesso
            alert('Tarefa excluída com sucesso');
            this.pesquisarTarefas(); //fazendo a consulta das tarefas
          },
          error: (e) => { //capturando a resposta de erro
            console.log(e.error);
          }
        });

    }
  }

  //função para exibir os dados da tarefa selecionada
  //para edição (ao clicar no botão Editar do GRID)
  obterTarefa(tarefa: any): void {
   
    this.formEdicao.controls['id'].setValue(tarefa.id);
    this.formEdicao.controls['nome'].setValue(tarefa.nome);
    this.formEdicao.controls['dataHora'].setValue(tarefa.dataHora.substring(0,16));
    this.formEdicao.controls['descricao'].setValue(tarefa.descricao);
    this.formEdicao.controls['prioridade'].setValue(tarefa.prioridade);
  }

  //função para atualizar a tarefa quando o usuário
  //clicar no botão SUBMIT do formulário de edição
  editarTarefa(): void {

    this.httpClient.put(this.endpoint, this.formEdicao.value)
      .subscribe({
        next: (data) => {
          alert('Tarefa atualizada com sucesso.');
          this.pesquisarTarefas();
        },
        error: (e) => {
          console.log(e.error);
        }
      });
  }
}
