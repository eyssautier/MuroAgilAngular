import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataTablesModule } from 'angular-datatables';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';

import { UsuarioService } from './services/usuario.service';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { RecuperarContrasennaComponent } from './recuperar-contrasenna/recuperar-contrasenna.component';
import { AuthInterceptor } from './auth-interceptor';
import { MurosComponent } from './muros/muros.component';
import { NombreUsuarioComponent } from './nombre-usuario/nombre-usuario.component';
import { AgregarEditarMuroComponent } from './agregar-editar-muro/agregar-editar-muro.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { EliminarMuroComponent } from './eliminar-muro/eliminar-muro.component';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { MurosService } from './services/muros.service';
import { UsuarioMuroService } from './services/usuario-muro.service';
import { RenunciarMuroComponent } from './renunciar-muro/renunciar-muro.component';
import { PermisosComponent } from './permisos/permisos.component';
import { AgregarEditarPermisoComponent } from './agregar-editar-permiso/agregar-editar-permiso.component';
import { EliminarPermisoComponent } from './eliminar-permiso/eliminar-permiso.component';
import { MuroComponent } from './muro/muro.component';

@NgModule({
  declarations: [
    AppComponent,
    IniciarSesionComponent,
    RegistrarseComponent,
    RecuperarContrasennaComponent,
    MurosComponent,
    NombreUsuarioComponent,
    AgregarEditarMuroComponent,
    EliminarMuroComponent,
    RenunciarMuroComponent,
    PermisosComponent,
    AgregarEditarPermisoComponent,
    EliminarPermisoComponent,
    MuroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DataTablesModule,
    MatButtonModule,
    MatDialogModule,
    CollapseModule.forRoot(),
    NgxDnDModule.forRoot()
  ],
  providers: [
    UsuarioService,
    MurosService,
    UsuarioMuroService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AgregarEditarMuroComponent,
    EliminarMuroComponent,
    RenunciarMuroComponent,
    PermisosComponent,
    AgregarEditarPermisoComponent,
    EliminarPermisoComponent
  ]
})
export class AppModule { }
