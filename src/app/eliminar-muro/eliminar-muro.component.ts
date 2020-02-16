import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MurosService } from '../services/muros.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CompConForm } from '../models/comp-con-form';

@Component({
  selector: 'app-eliminar-muro',
  templateUrl: './eliminar-muro.component.html',
  styleUrls: ['./eliminar-muro.component.scss']
})
export class EliminarMuroComponent extends CompConForm implements OnInit {

  @Input() idMuro: number = null;
  @Output() realizoCambio = new EventEmitter<boolean>();

  constructor(private murosService: MurosService) {
    super();
  }

  ngOnInit() {
    this.errors = [];
    this.procesando = false;
  }

  cancelar(): void {
    this.realizoCambio.emit(false);
  }

  eliminar(): void {
    this.errors = [];
    this.procesando = true;

    this.murosService.eliminarMuro(this.idMuro)
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
