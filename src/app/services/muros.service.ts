import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SalElemListaMuro } from '../models/salidas/muro/sal-elem-lista-muro';
import { SalMuroConEtapas } from '../models/salidas/muro/sal-muro-con-etapas';
import { EntCrearMuro } from '../models/entradas/muro/ent-crear-muro';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { EntEditarMuro } from '../models/entradas/muro/ent-editar-muro';
import { SalMuroConTareas } from '../models/salidas/muro/sal-muro-con-tareas';

@Injectable({
  providedIn: 'root'
})
export class MurosService {

  private readonly myAppUrl: string;
  private readonly myApiUrl: string;
  private readonly httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/Muros/';
  }

  murosUsuario(): Observable<SalElemListaMuro[]> {
    return this.http.get<SalElemListaMuro[]>(this.myAppUrl + this.myApiUrl, this.httpOptions)
    .pipe();
  }

  muroConEtapas(idMuro: number): Observable<SalMuroConEtapas> {
    return this.http.get<SalMuroConEtapas>(this.myAppUrl + this.myApiUrl + idMuro, this.httpOptions)
    .pipe();
  }

  muroConTareas(idMuro: number): Observable<SalMuroConTareas> {
    const controllerMethod = 'ObtenerTareas/';
    return this.http.get<SalMuroConTareas>(this.myAppUrl + this.myApiUrl + controllerMethod + idMuro, this.httpOptions)
    .pipe();
  }

  crearMuro(datosMuro: EntCrearMuro): Observable<any> {
    return this.http.post<any>(this.myAppUrl + this.myApiUrl, JSON.stringify(datosMuro), this.httpOptions)
    .pipe();
  }

  editarMuro(datosMuro: EntEditarMuro): Observable<any> {
    return this.http.put<any>(this.myAppUrl + this.myApiUrl, JSON.stringify(datosMuro), this.httpOptions)
    .pipe();
  }

  eliminarMuro(idMuro: number): Observable<any> {
    return this.http.delete<any>(this.myAppUrl + this.myApiUrl + idMuro, this.httpOptions)
    .pipe();
  }
}
