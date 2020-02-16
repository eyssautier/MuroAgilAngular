import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarMuroComponent } from './agregar-editar-muro.component';

describe('AgregarEditarMuroComponent', () => {
  let component: AgregarEditarMuroComponent;
  let fixture: ComponentFixture<AgregarEditarMuroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEditarMuroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEditarMuroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
