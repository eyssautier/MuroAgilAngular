import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { EntCrearUsuario } from '../models/entradas/usuario/ent-crear-usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent implements OnInit {
  formRegistrarse: FormGroup;
  errors: string[];
  creando: boolean;

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.formRegistrarse = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      nombre: ['', [Validators.required]],
      contrasenna: ['', [Validators.required, Validators.minLength(8)]],
      repContrasenna: ['', [Validators.required]]
    });

    this.errors = [];
    this.creando = false;
  }

  crearUsuario(): void {
    if (!this.formRegistrarse.valid) {
      return;
    }

    this.errors = [];
    this.creando = true;

    const entCrearUsuario: EntCrearUsuario = {
      correo: this.formRegistrarse.get('correo').value,
      nombre: this.formRegistrarse.get('nombre').value,
      contrasenna: this.formRegistrarse.get('contrasenna').value
    };

    this.usuarioService.crearUsuario(entCrearUsuario)
    .subscribe({
      next: () => {
        this.router.navigate(['/iniciarSesion']);
      },
      error: err => {
        this.creando = false;
        if (err.status === 400) {
          const error = err.error;
          if (error != null && error.errors != null) {
            for (const campos in error.errors) {
              if (error.errors.hasOwnProperty(campos)) {
                this.errors = this.errors.concat(error.errors[campos]);
              }
            }
          }
        }
      }
    });
  }

  public getError(controlName: string): ValidationErrors {
    const control = this.formRegistrarse.get(controlName);
    if (control.touched && control.errors != null) {
      return control.errors;
    }
    return null;
  }
}
