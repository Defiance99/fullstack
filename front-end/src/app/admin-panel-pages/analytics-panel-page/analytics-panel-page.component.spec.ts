import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsPanelPageComponent } from './analytics-panel-page.component';

describe('AnalyticsPanelPageComponent', () => {
  let component: AnalyticsPanelPageComponent;
  let fixture: ComponentFixture<AnalyticsPanelPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsPanelPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsPanelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
