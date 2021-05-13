<<<<<<< HEAD
import { MisReservasComponent } from './pages/mis-reservas/mis-reservas.component';
=======
import { GuardianService } from './_service/guardian.service';
import { HotelComponent } from './pages/hotel/hotel.component';
>>>>>>> a137a7c8d8048c39db647a7d059a5b9d09a3c346
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
  {path: 'perfil', component: PerfilComponent, canActivate: [GuardianService]}, //Guardian
  {path: 'perfil', component: PerfilComponent},
<<<<<<< HEAD
  {path: 'mis_reservas', component: MisReservasComponent},
=======
  {path: 'hotel', component: HotelComponent},
>>>>>>> a137a7c8d8048c39db647a7d059a5b9d09a3c346
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
