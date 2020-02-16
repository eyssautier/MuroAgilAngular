import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CompConForm } from '../models/comp-con-form';
import { UsuarioMuroService } from '../services/usuario-muro.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EntCrearPermiso } from '../models/entradas/usuario-muro/ent-crear-permiso';
import { EntEditarEtapa } from '../models/entradas/muro/ent-editar-etapa';

@Component({
  selector: 'app-agregar-editar-permiso',
  templateUrl: './agregar-editar-permiso.component.html',
  styleUrls: ['./agregar-editar-permiso.component.scss']
})
export class AgregarEditarPermisoComponent extends CompConForm implements OnInit {

  @Input() idMuro: number;
  @Input() correo: string = null;
  @Input() nombre: string = null;
  @Input() permiso: number = null;
  @Output() realizoCambio = new EventEmitter<boolean>();

  agregando = true;
  titulo: string;
  textoBoton: string;

  constructor(private usuarioMuroService: UsuarioMuroService, private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    if (this.correo != null && this.nombre != null && this.permiso != null) {
      this.agregando = false;
    }

    this.form = this.formBuilder.group({
      idMuro: [this.idMuro, [Validators.required]],
      correo: [{value: this.correo, disabled: !this.agregando}, [Validators.required, Validators.email]],
      nombre: [{value: this.nombre, disabled: true}],
      permiso: [this.permiso != null ? this.permiso : 2, [Validators.required]]
    });
    this.errors = [];

    if (this.agregando) {
      this.titulo = 'Otorgamiento de un Permiso';
      this.textoBoton = 'Otorgar';
    } else {
      this.titulo = 'Modificación de un Permiso';
      this.textoBoton = 'Modificar';
    }
  }

  cancelar(): void {
    this.realizoCambio.emit(false);
  }

  grabarMuro(): void {
    if (!this.form.valid) {
      return;
    }

    this.errors = [];
    this.procesando = true;

    if (this.agregando) {
      this.crearPermiso();
    } else {
      this.modificarPermiso();
    }
  }

  crearPermiso() {
    const entCrearPermiso: EntCrearPermiso = {
      idMuro: this.form.get('idMuro').value,
      correo: this.form.get('correo').value,
      permiso: this.form.get('permiso').value
    };

    this.usuarioMuroService.crearPermiso(entCrearPermiso)
    .subscribe({
      next: () => {
        this.realizoCambio.emit(true);
      },
      error: err => {
        this.procesarError(err);
      }
    });
  }

  modificarPermiso() {
    const entEditarPermiso: EntCrearPermiso = {
      idMuro: this.form.get('idMuro').value,
      correo: this.form.get('correo').value,
      permiso: this.form.get('permiso').value
    };

    this.usuarioMuroService.editarPermiso(entEditarPermiso)
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
