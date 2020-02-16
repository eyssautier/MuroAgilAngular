import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { RecuperarContrasennaComponent } from './recuperar-contrasenna/recuperar-contrasenna.component';
import { MurosComponent } from './muros/muros.component';
import { MuroComponent } from './muro/muro.component';


const routes: Routes = [
  { path: '', component: MurosComponent, pathMatch: 'full' },
  { path: 'registrarse', component: RegistrarseComponent, pathMatch: 'full' },
  { path: 'iniciarSesion', component: IniciarSesionComponent, pathMatch: 'full' },
  { path: 'recuperarContrasenna', component: RecuperarContrasennaComponent, pathMatch: 'full' },
  { path: 'muro/:id', component: MuroComponent, pathMatch: 'full' },
  { path: 'muros', component: MurosComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
