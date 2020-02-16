import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarMuroComponent } from './eliminar-muro.component';

describe('EliminarMuroComponent', () => {
  let component: EliminarMuroComponent;
  let fixture: ComponentFixture<EliminarMuroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarMuroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarMuroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
