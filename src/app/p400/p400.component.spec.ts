import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P400Component } from './p400.component';

describe('P400Component', () => {
  let component: P400Component;
  let fixture: ComponentFixture<P400Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P400Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P400Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
