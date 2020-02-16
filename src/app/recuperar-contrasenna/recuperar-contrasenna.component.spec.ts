import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarContrasennaComponent } from './recuperar-contrasenna.component';

describe('RecuperarContrasennaComponent', () => {
  let component: RecuperarContrasennaComponent;
  let fixture: ComponentFixture<RecuperarContrasennaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuperarContrasennaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarContrasennaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
