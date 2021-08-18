import { TestBed } from '@angular/core/testing';

import { SongListingService } from './song-listing.service';

describe('SongListingService', () => {
  let service: SongListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
