import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CompConForm } from '../models/comp-con-form';
import { UsuarioMuroService } from '../services/usuario-muro.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-renunciar-muro',
  templateUrl: './renunciar-muro.component.html',
  styleUrls: ['./renunciar-muro.component.scss']
})
export class RenunciarMuroComponent extends CompConForm implements OnInit {

  @Input() idMuro: number = null;
  @Output() realizoCambio = new EventEmitter<boolean>();

  constructor(private usuarioMuroService: UsuarioMuroService, private dialogRef: MatDialogRef<RenunciarMuroComponent>) {
    super();
  }

  ngOnInit() {
    this.errors = [];
    this.procesando = false;
  }

  cancelar(): void {
    this.realizoCambio.emit(false);
  }

  renunciar(): void {
    this.errors = [];
    this.procesando = true;

    this.usuarioMuroService.renunciarMuro(this.idMuro)
    .subscribe({
      next: () => {
        this.realizoCambio.emit(true);
        this.dialogRef.close();
      },
      error: err => {
        this.procesarError(err);
      }
    });
  }
}
