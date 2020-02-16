import { TestBed } from '@angular/core/testing';

import { UsuarioMuroService } from './usuario-muro.service';

describe('UsuarioMuroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuarioMuroService = TestBed.get(UsuarioMuroService);
    expect(service).toBeTruthy();
  });
});
