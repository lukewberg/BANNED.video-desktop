import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipButtonComponent } from './pip-button.component';

describe('PipButtonComponent', () => {
  let component: PipButtonComponent;
  let fixture: ComponentFixture<PipButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
