import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowRatingComponent } from './flow-rating.component';

describe('FlowRatingComponent', () => {
  let component: FlowRatingComponent;
  let fixture: ComponentFixture<FlowRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
