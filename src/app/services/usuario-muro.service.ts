import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SalObtenerPermisos } from '../models/salidas/usuario-muro/sal-obtener-permisos';
import { EntCrearPermiso } from '../models/entradas/usuario-muro/ent-crear-permiso';

@Injectable({
  providedIn: 'root'
})
export class UsuarioMuroService {
  private readonly myAppUrl: string;
  private readonly myApiUrl: string;
  private readonly httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/UsuarioMuros/';
  }

  obtenerPermisos(idMuro: number): Observable<SalObtenerPermisos[]> {
    return this.http.get<SalObtenerPermisos[]>(this.myAppUrl + this.myApiUrl + idMuro, this.httpOptions)
    .pipe();
  }

  crearPermiso(entrada: EntCrearPermiso): Observable<SalObtenerPermisos> {
    return this.http.post<SalObtenerPermisos>(this.myAppUrl + this.myApiUrl, JSON.stringify(entrada), this.httpOptions)
    .pipe();
  }

  editarPermiso(entrada: EntCrearPermiso): Observable<SalObtenerPermisos> {
    return this.http.put<SalObtenerPermisos>(this.myAppUrl + this.myApiUrl, JSON.stringify(entrada), this.httpOptions)
    .pipe();
  }

  eliminarPermiso(idMuro: number, correo: string): Observable<any> {
    return this.http.delete<any>(this.myAppUrl + this.myApiUrl + idMuro + '/' + correo, this.httpOptions)
    .pipe();
  }

  renunciarMuro(idMuro: number): Observable<any> {
    const controllerMethod = 'Renunciar/';
    return this.http.delete<any>(this.myAppUrl + this.myApiUrl + controllerMethod + idMuro, this.httpOptions)
    .pipe();
  }
}
