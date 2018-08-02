import { TestBed, inject } from '@angular/core/testing';

import { CssService } from './css.service';

describe('CssService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CssService]
    });
  });

  it('should be created', inject([CssService], (service: CssService) => {
    expect(service).toBeTruthy();
  }));
});
