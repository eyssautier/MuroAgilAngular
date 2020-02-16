import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { EntIniciarSesion } from '../models/entradas/usuario/ent-iniciar-sesion';
import { Router } from '@angular/router';
import { CompConForm } from '../models/comp-con-form';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent extends CompConForm implements OnInit {

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder, private router: Router) {
    super();
  }

  ngOnInit() {
    if (this.usuarioService.inicioSesion()) {
      this.usuarioService.cerrarSesion();
    }

    this.form = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenna: ['', [Validators.required]]
    });

    this.errors = [];
  }

  iniciarSesion() {
    if (!this.form.valid) {
      return;
    }

    this.errors = [];
    this.procesando = true;

    const entIniciarSesion: EntIniciarSesion = {
      correo: this.form.get('correo').value,
      contrasenna: this.form.get('contrasenna').value
    };

    this.usuarioService.iniciarSesion(entIniciarSesion)
    .subscribe({
      next: () => {
        this.obtenerNombreUsuario();
        this.router.navigate(['/muros']);
      },
      error: err => {
        this.procesarError(err);
      }
    });
  }

  obtenerNombreUsuario() {
    this.usuarioService.datosUsuario()
    .subscribe({
      next: res => {
        this.usuarioService.setNombreUsuario(res.nombre);
      }
    });
  }
}
