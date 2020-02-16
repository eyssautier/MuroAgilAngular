import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError, tap, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

import { EntIniciarSesion } from '../models/entradas/usuario/ent-iniciar-sesion';
import { EntCrearUsuario } from '../models/entradas/usuario/ent-crear-usuario';
import { SalDatosUsuario } from '../models/salidas/usuario/sal-datos-usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})
  };

  nombreUsuario = '';

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/Usuarios/';
  }

  public setNombreUsuario(nombreUsuario: string) {
    this.nombreUsuario = nombreUsuario;
  }

  public getNombreUsuario(): string {
    return this.nombreUsuario;
  }

  iniciarSesion(correoContrasenna: EntIniciarSesion): Observable<object> {
    const controllerMethod = 'IniciarSesion';
    return this.http.post<object>(this.myAppUrl + this.myApiUrl + controllerMethod, JSON.stringify(correoContrasenna), this.httpOptions)
    .pipe(
      tap(res => this.setSession(res)),
      shareReplay()
    );
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'minute');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  cerrarSesion() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public inicioSesion() {
    return moment().isBefore(this.getExpiration());
  }

  public cerroSesion() {
    return !this.inicioSesion();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  crearUsuario(datosUsuario: EntCrearUsuario): Observable<object> {
    return this.http.post<object>(this.myAppUrl + this.myApiUrl, JSON.stringify(datosUsuario), this.httpOptions)
    .pipe();
  }

  datosUsuario(): Observable<SalDatosUsuario> {
    return this.http.get<SalDatosUsuario>(this.myAppUrl + this.myApiUrl, this.httpOptions)
    .pipe();
  }
}
