import { Routes } from '@angular/router';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { CriarUsuarioComponent } from './criar-usuario/criar-usuario.component';
import { ManterTarefasComponent } from './manter-tarefas/manter-tarefas.component';

export const routes: Routes = [
    {
        path: 'login-usuario',
        component: LoginUsuarioComponent
    },
    {
        path: 'criar-usuario',
        component: CriarUsuarioComponent
    },
    {
        path: 'manter-tarefas',
        component: ManterTarefasComponent
    },
    {
        path: '', pathMatch: 'full',
        redirectTo: '/login-usuario'
    }
];
