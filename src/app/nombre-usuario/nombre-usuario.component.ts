import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-nombre-usuario',
  templateUrl: './nombre-usuario.component.html',
  styleUrls: ['./nombre-usuario.component.scss']
})
export class NombreUsuarioComponent implements OnInit {

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit() {
    if (this.usuarioService.inicioSesion()) {
      this.usuarioService.datosUsuario()
      .subscribe({
        next: res => {
          this.usuarioService.setNombreUsuario(res.nombre);
        }
      });
    }
  }

}
