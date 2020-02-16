import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MurosService } from '../services/muros.service';
import { SalMuroConEtapas } from '../models/salidas/muro/sal-muro-con-etapas';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { EntCrearMuro } from '../models/entradas/muro/ent-crear-muro';
import { MatDialogRef } from '@angular/material/dialog';
import { EntEditarMuro } from '../models/entradas/muro/ent-editar-muro';
import { CompConForm } from '../models/comp-con-form';

@Component({
  selector: 'app-agregar-editar-muro',
  templateUrl: './agregar-editar-muro.component.html',
  styleUrls: ['./agregar-editar-muro.component.scss']
})
export class AgregarEditarMuroComponent extends CompConForm implements OnInit {

  @Input() idMuro: number = null;
  @Output() realizoCambio = new EventEmitter<boolean>();
  titulo: string;

  @ViewChild('eliminoEtapa', {static: false}) eliminoEtapa: ElementRef;

  constructor(private murosService: MurosService, private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      idMuro: [],
      nombre: ['', [Validators.required]],
      etapas: this.formBuilder.array([]),
      accionTareas: ['1', [Validators.required]]
    });
    this.errors = [];

    if (this.idMuro != null) {
      this.titulo = 'Editar Muro';
      this.obtenerMuro();
    } else {
      this.titulo = 'Crear Muro';
      this.agregarEtapasDefecto();
    }
  }

  obtenerMuro(): void {
    this.murosService.muroConEtapas(this.idMuro).subscribe(
      res => {
        const muro: SalMuroConEtapas = res;
        this.form.get('nombre').setValue(muro.nombreMuro);
        this.form.get('idMuro').setValue(muro.idMuro);
        const control = this.form.get('etapas') as FormArray;
        muro.etapas.forEach(x => {
          control.push(this.formBuilder.group({
            id: [x.id, [Validators.required]],
            nombre: [x.nombre, [Validators.required]],
            posicion: [x.posicion, [Validators.required]]
          }));
        });
      }
    );
  }

  agregarEtapasDefecto(): void {
    const control = this.form.get('etapas') as FormArray;

    control.push(this.formBuilder.group({
      id: [0, [Validators.required]],
      nombre: ['PENDIENTE', [Validators.required]],
      posicion: [1, [Validators.required]]
    }));

    control.push(this.formBuilder.group({
      id: [0, [Validators.required]],
      nombre: ['EN PROCESO', [Validators.required]],
      posicion: [2, [Validators.required]]
    }));

    control.push(this.formBuilder.group({
      id: [0, [Validators.required]],
      nombre: ['TERMINADO', [Validators.required]],
      posicion: [3, [Validators.required]]
    }));
  }

  agregarEtapa(): void {
    const control = this.form.get('etapas') as FormArray;
    control.push(this.formBuilder.group({
      id: [0, [Validators.required]],
      nombre: ['', [Validators.required]],
      posicion: [control.length + 1, [Validators.required]]
    }));
  }

  eliminarEtapa(i: number): void {
    const control = this.form.get('etapas') as FormArray;
    const idEtapa = control.controls[i].get('id').value;
    control.removeAt(i);
    this.actualizarPosiciones();
    if (idEtapa > 0) {
      this.eliminoEtapa.nativeElement.style.display = 'flex';
    }
  }

  actualizarPosiciones(): void {
    const control = this.form.get('etapas') as FormArray;
    let pos = 1;
    for (const etapaControl of control.controls) {
      etapaControl.get('posicion').setValue(pos);
      pos++;
    }
  }

  dropped(event): void {
    const etapasCopy = [];
    const control = this.form.get('etapas') as FormArray;
    for (const etapaControl of control.controls) {
      etapasCopy.push(etapaControl.value);
    }
    control.reset(etapasCopy);
    this.actualizarPosiciones();
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

    if (this.form.get('idMuro').value > 0) {
      this.modificarMuro();
    } else {
      this.crearMuro();
    }
  }

  crearMuro() {
    const entCrearMuro: EntCrearMuro = {
      nombre: this.form.get('nombre').value,
      etapas: []
    };
    const control = this.form.get('etapas') as FormArray;
    for (const etapaControl of control.controls) {
      entCrearMuro.etapas.push({
        nombre: etapaControl.get('nombre').value,
        posicion: etapaControl.get('posicion').value
      });
    }

    this.murosService.crearMuro(entCrearMuro)
    .subscribe({
      next: () => {
        this.realizoCambio.emit(true);
      },
      error: err => {
        this.procesarError(err);
      }
    });
  }

  modificarMuro() {
    const entEditarMuro: EntEditarMuro = {
      id: this.form.get('idMuro').value,
      nombre: this.form.get('nombre').value,
      accion: this.form.get('accionTareas').value,
      etapas: []
    };
    const control = this.form.get('etapas') as FormArray;
    for (const etapaControl of control.controls) {
      entEditarMuro.etapas.push({
        id: etapaControl.get('id').value,
        nombre: etapaControl.get('nombre').value,
        posicion: etapaControl.get('posicion').value
      });
    }

    this.murosService.editarMuro(entEditarMuro)
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
