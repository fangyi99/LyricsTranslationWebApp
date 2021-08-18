import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSongsComponent } from './user-songs.component';

describe('UserSongsComponent', () => {
  let component: UserSongsComponent;
  let fixture: ComponentFixture<UserSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSongsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
