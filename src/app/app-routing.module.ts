import { ComentarCalificarComponent } from './pages/comentar-calificar/comentar-calificar.component';
import { ComprarMembresiasComponent } from './pages/perfil/comprar-membresias/comprar-membresias.component';
import { AgregarHabitacionComponent } from './pages/perfil/agregar-habitacion/agregar-habitacion.component';
import { RecuperarConstrasenaComponent } from './pages/login/recuperar-constrasena/recuperar-constrasena.component';
import { ReservarComponent } from './pages/hotel/reservar/reservar.component';
import { ActualizarContrasenaComponent } from './pages/perfil/actualizar-contrasena/actualizar-contrasena.component';
import { EditarPerfilComponent } from './pages/perfil/editar-perfil/editar-perfil.component';
import { Error401Component } from './pages/error401/error401.component';
import { MisReservasComponent } from './pages/mis-reservas/mis-reservas.component';
import { GuardianService } from './_service/guardian.service';
import { HotelComponent } from './pages/hotel/hotel.component';
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
  {path: 'login', component: LoginComponent, children: [
    {path : 'recuperarConstrasena', component: RecuperarConstrasenaComponent}
  ]},
  {path: 'inicio', component: InicioComponent},
  {path: 'perfil', component: PerfilComponent, children: [
      {path: 'actualizarcontrasena', component: ActualizarContrasenaComponent},
      {path: 'editarperfil', component: EditarPerfilComponent},
      {path: 'agregar_habitacion', component: AgregarHabitacionComponent},
      {path: 'comprarmembresias', component: ComprarMembresiasComponent}
  ], canActivate: [GuardianService]}, //Guardian

  {path: 'error401', component: Error401Component},
  {path: 'mis_reservas', component: MisReservasComponent},
  {path: 'comentar-calificar', component: ComentarCalificarComponent},
  {path: 'hotel', component: HotelComponent},
  {path: 'hotel', component: HotelComponent, children: [
      {path: 'reservar', component: ReservarComponent}
  ]},
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
