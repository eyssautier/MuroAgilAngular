import { TestBed } from '@angular/core/testing';

import { MurosService } from './muros.service';

describe('MurosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MurosService = TestBed.get(MurosService);
    expect(service).toBeTruthy();
  });
});
