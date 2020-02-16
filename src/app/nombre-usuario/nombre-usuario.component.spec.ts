import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NombreUsuarioComponent } from './nombre-usuario.component';

describe('NombreUsuarioComponent', () => {
  let component: NombreUsuarioComponent;
  let fixture: ComponentFixture<NombreUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NombreUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NombreUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
