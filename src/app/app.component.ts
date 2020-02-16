import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Muro Ágil';
  isCollapsed = true;

  constructor(public usuarioService: UsuarioService) {
  }

  ngOnInit() {
  }

}
