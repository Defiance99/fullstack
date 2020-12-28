import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPanelPageComponent } from './main-panel-page.component';

describe('MainPanelPageComponent', () => {
  let component: MainPanelPageComponent;
  let fixture: ComponentFixture<MainPanelPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPanelPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPanelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
