import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CompConForm } from '../models/comp-con-form';
import { MurosService } from '../services/muros.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SalMuroConTareas } from '../models/salidas/muro/sal-muro-con-tareas';

@Component({
  selector: 'app-muro',
  templateUrl: './muro.component.html',
  styleUrls: ['./muro.component.scss']
})
export class MuroComponent extends CompConForm implements OnInit, OnDestroy {

  private subscription: Subscription;

  idMuro: number;
  detalleMuro = new SalMuroConTareas();
  anchoColumnas = '100%';

  constructor(private murosService: MurosService, private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.idMuro = +(params.id);
      this.mostrarDetalleMuro();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  mostrarDetalleMuro(): void {
    this.murosService.muroConTareas(this.idMuro).subscribe(
      res => {
        this.detalleMuro = res;
        this.anchoColumnas = Math.floor(100 / this.detalleMuro.etapas.length) + '%';
      }
    );
  }

  agregarTarea(idEtapa: number): void {

  }
}
