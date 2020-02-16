import { Component, OnInit, Input } from '@angular/core';
import { CompConForm } from '../models/comp-con-form';
import { SalObtenerPermisos } from '../models/salidas/usuario-muro/sal-obtener-permisos';
import { UsuarioMuroService } from '../services/usuario-muro.service';
import { UsuarioMuro } from '../models/usuario-muro';
import { MatDialogRef, MatDialog, MatDialogClose, MatDialogConfig } from '@angular/material/dialog';
import { AgregarEditarPermisoComponent } from '../agregar-editar-permiso/agregar-editar-permiso.component';
import { EliminarPermisoComponent } from '../eliminar-permiso/eliminar-permiso.component';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss']
})
export class PermisosComponent extends CompConForm implements OnInit {

  @Input()
  idMuro: number;
  @Input()
  nombreMuro: string;

  permisos: SalObtenerPermisos[];
  ocultarPopup = false;

  private readonly dialogConfig: MatDialogConfig;

  constructor(private usuarioMuroService: UsuarioMuroService, private matDialog: MatDialog,
              private dialogRef: MatDialogRef<PermisosComponent>) {
    super();
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.maxHeight = '99vh';
  }

  ngOnInit() {
    this.errors = [];
    this.obtenerPermisos();
  }

  obtenerPermisos(): void {
    this.permisos = [];
    this.usuarioMuroService.obtenerPermisos(this.idMuro).subscribe(
      res => {
        res.forEach(permiso => {
          if (permiso.permiso !== 1) {
            this.permisos.push(permiso);
          }
        });
      }
    );
  }

  nombrePermiso(permiso: number): string {
    return UsuarioMuro.nombrePermiso(permiso);
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  abrirAgregarEditarPermisoPopup(idMuro: number, correo: string = null, nombre: string = null, permiso: number = null): void {
    this.ocultarPopup = true;
    const modalDialog = this.matDialog.open(AgregarEditarPermisoComponent, this.dialogConfig);
    modalDialog.componentInstance.idMuro = idMuro;
    modalDialog.componentInstance.correo = correo;
    modalDialog.componentInstance.nombre = nombre;
    modalDialog.componentInstance.permiso = permiso;
    modalDialog.componentInstance.realizoCambio.subscribe(cambio => {
      if (cambio) {
        this.obtenerPermisos();
      }
      modalDialog.close();
    });
    modalDialog.afterClosed().subscribe(() => {
      this.ocultarPopup = false;
    });
  }

  abrirEliminarPermisoPopup(idMuro: number, correo: string): void {
    this.ocultarPopup = true;
    const modalDialog = this.matDialog.open(EliminarPermisoComponent, this.dialogConfig);
    modalDialog.componentInstance.idMuro = idMuro;
    modalDialog.componentInstance.correo = correo;
    modalDialog.componentInstance.realizoCambio.subscribe(cambio => {
      if (cambio) {
        this.obtenerPermisos();
      }
      modalDialog.close();
    });
    modalDialog.afterClosed().subscribe(() => {
      this.ocultarPopup = false;
    });
  }
}
