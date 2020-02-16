import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenunciarMuroComponent } from './renunciar-muro.component';

describe('RenunciarMuroComponent', () => {
  let component: RenunciarMuroComponent;
  let fixture: ComponentFixture<RenunciarMuroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenunciarMuroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenunciarMuroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
