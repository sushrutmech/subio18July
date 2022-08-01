import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnHoverKeyComponent } from './on-hover-key.component';

describe('OnHoverKeyComponent', () => {
  let component: OnHoverKeyComponent;
  let fixture: ComponentFixture<OnHoverKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnHoverKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnHoverKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
