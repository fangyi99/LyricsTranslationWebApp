import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongListingComponent } from './song-listing.component';

describe('SongListingComponent', () => {
  let component: SongListingComponent;
  let fixture: ComponentFixture<SongListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
