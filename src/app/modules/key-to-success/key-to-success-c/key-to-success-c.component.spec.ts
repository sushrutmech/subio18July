import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyToSuccessCComponent } from './key-to-success-c.component';

describe('KeyToSuccessCComponent', () => {
  let component: KeyToSuccessCComponent;
  let fixture: ComponentFixture<KeyToSuccessCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyToSuccessCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyToSuccessCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
