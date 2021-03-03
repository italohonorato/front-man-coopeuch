import { TestBed } from '@angular/core/testing';

import { MantenedorService } from './mantenedor.service';

describe('MantenedorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MantenedorService = TestBed.get(MantenedorService);
    expect(service).toBeTruthy();
  });
});
