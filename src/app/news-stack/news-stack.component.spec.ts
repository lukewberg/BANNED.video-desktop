import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsStackComponent } from './news-stack.component';

describe('NewsStackComponent', () => {
  let component: NewsStackComponent;
  let fixture: ComponentFixture<NewsStackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsStackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
