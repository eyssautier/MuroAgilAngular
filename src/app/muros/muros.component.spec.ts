import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioMuroComponent } from './muros.component';

describe('UsuarioMuroComponent', () => {
  let component: UsuarioMuroComponent;
  let fixture: ComponentFixture<UsuarioMuroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioMuroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioMuroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
