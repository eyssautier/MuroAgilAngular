import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { MurosService } from '../services/muros.service';
import { SalElemListaMuro } from '../models/salidas/muro/sal-elem-lista-muro';
import { UsuarioMuro } from '../models/usuario-muro';
import { Observable, Subject } from 'rxjs';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgregarEditarMuroComponent } from '../agregar-editar-muro/agregar-editar-muro.component';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { EliminarMuroComponent } from '../eliminar-muro/eliminar-muro.component';
import { RenunciarMuroComponent } from '../renunciar-muro/renunciar-muro.component';
import { PermisosComponent } from '../permisos/permisos.component';

@Component({
  selector: 'app-muros',
  templateUrl: './muros.component.html',
  styleUrls: ['./muros.component.scss']
})
export class MurosComponent implements AfterViewInit {
  listaMuros: SalElemListaMuro[];

  private readonly dialogConfig: MatDialogConfig;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {
    language: {
      lengthMenu: '_MENU_ muros por página.',
      zeroRecords: 'No se encontró muros asociados a la búsqueda...',
      info: 'Página _PAGE_ de _PAGES_',
      infoEmpty: 'No tienes muros...',
      infoFiltered: '(Resultado obtenido de un total de _MAX_ muros).',
      search: 'Buscar:',
      paginate: {
        next: 'Siguiente',
        previous: 'Anterior',
        first: 'Primera',
        last: 'Última'
      }
    },
    dom: '<"cabecera"<"paginacionSup"l><"filtro"f>>rt<"paginacionInf"p>',
    columns: [
      { className: 'text-center align-middle' },
      { className: 'text-center align-middle' },
      { className: 'text-center align-middle' },
      { className: 'text-center align-middle' },
      { className: 'text-center align-middle' },
      { className: 'text-center align-middle', orderable: false }
    ],
    scrollX: false,
    order: [[4, 'desc']],
    drawCallback(settings) {
      let elem: HTMLElement = document.querySelector('.dataTables_scrollBody') as HTMLElement;
      if (elem) {
        elem = elem.querySelector('.dataTable') as HTMLElement;
        if (elem) {
          elem.style.margin = '0px';
        }
      }
    }
  };
  dtTrigger: Subject<any> = new Subject();

  constructor(private murosService: MurosService, private matDialog: MatDialog) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.maxHeight = '99vh';
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.mostrarMuros();
  }

  mostrarMuros(): void {
    this.murosService.murosUsuario().subscribe(
      res => {
        this.listaMuros = res;
        this.rerenderTabla();
      }
    );
  }

  rerenderTabla(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  nombrePermiso(permiso: number): string {
    return UsuarioMuro.nombrePermiso(permiso);
  }

  abrirPermisosPopup(idMuro: number, nombreMuro: string = '') {
    const modalDialog = this.matDialog.open(PermisosComponent, this.dialogConfig);
    modalDialog.componentInstance.idMuro = idMuro;
    modalDialog.componentInstance.nombreMuro = nombreMuro;
  }

  abrirAgregarEditarMuroPopup(idMuro: number = null) {
    const modalDialog = this.matDialog.open(AgregarEditarMuroComponent, this.dialogConfig);
    modalDialog.componentInstance.idMuro = idMuro;
    modalDialog.componentInstance.realizoCambio.subscribe(cambio => {
      if (cambio) {
        this.mostrarMuros();
      }
      modalDialog.close();
    });
  }

  abrirEliminarMuroPopup(idMuro: number) {
    const modalDialog = this.matDialog.open(EliminarMuroComponent, this.dialogConfig);
    modalDialog.componentInstance.idMuro = idMuro;
    modalDialog.componentInstance.realizoCambio.subscribe(cambio => {
      if (cambio) {
        this.mostrarMuros();
      }
      modalDialog.close();
    });
  }

  abrirRenunciarMuroPopup(idMuro: number) {
    const modalDialog = this.matDialog.open(RenunciarMuroComponent, this.dialogConfig);
    modalDialog.componentInstance.idMuro = idMuro;
    modalDialog.componentInstance.realizoCambio.subscribe(cambio => {
      if (cambio) {
        this.mostrarMuros();
      }
      modalDialog.close();
    });
  }
}
