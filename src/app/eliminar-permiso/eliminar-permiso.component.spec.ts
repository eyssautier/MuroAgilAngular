import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPermisoComponent } from './eliminar-permiso.component';

describe('EliminarPermisoComponent', () => {
  let component: EliminarPermisoComponent;
  let fixture: ComponentFixture<EliminarPermisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarPermisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
