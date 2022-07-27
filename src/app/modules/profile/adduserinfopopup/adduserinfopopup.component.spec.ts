import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduserinfopopupComponent } from './adduserinfopopup.component';

describe('AdduserinfopopupComponent', () => {
  let component: AdduserinfopopupComponent;
  let fixture: ComponentFixture<AdduserinfopopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdduserinfopopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdduserinfopopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
