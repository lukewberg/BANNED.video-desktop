import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressgliderComponent } from './progressglider.component';

describe('ProgressgliderComponent', () => {
  let component: ProgressgliderComponent;
  let fixture: ComponentFixture<ProgressgliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressgliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressgliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
