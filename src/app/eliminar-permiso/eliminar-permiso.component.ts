import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CompConForm } from '../models/comp-con-form';
import { UsuarioMuroService } from '../services/usuario-muro.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-permiso',
  templateUrl: './eliminar-permiso.component.html',
  styleUrls: ['./eliminar-permiso.component.scss']
})
export class EliminarPermisoComponent extends CompConForm implements OnInit {

  @Input() idMuro: number;
  @Input() correo: string;
  @Output() realizoCambio = new EventEmitter<boolean>();

  constructor(private usuarioMuroService: UsuarioMuroService) {
    super();
  }

  ngOnInit(): void {
    this.errors = [];
    this.procesando = false;
  }

  cancelar(): void {
    this.realizoCambio.emit(false);
  }

  eliminar(): void {
    this.errors = [];
    this.procesando = true;

    this.usuarioMuroService.eliminarPermiso(this.idMuro, this.correo)
    .subscribe({
      next: () => {
        this.realizoCambio.emit(true);
      },
      error: err => {
        this.procesarError(err);
      }
    });
  }
}
