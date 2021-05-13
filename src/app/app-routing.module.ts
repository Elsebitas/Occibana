import { MisReservasComponent } from './pages/mis-reservas/mis-reservas.component';
import { Error404Component } from './pages/error404/error404.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './pages/perfil/perfil.component';

/**
 * Constante para definir las rutas de la página.
 */
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'mis_reservas', component: MisReservasComponent},
  {path: '', component: InicioComponent},
  {path: '**', component: Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
/**
 * Clase AppRoutingModule.
 */
export class AppRoutingModule { }
