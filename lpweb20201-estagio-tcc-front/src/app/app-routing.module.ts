import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SobreComponent } from './sobre/sobre.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { PerfilCadastroComponent } from './perfil/perfil-cadastro/perfil-cadastro.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'perfil/novo', component: PerfilCadastroComponent },
  { path: 'perfil/editar/:id', component: PerfilCadastroComponent },
  { path: 'sobre', component: SobreComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
