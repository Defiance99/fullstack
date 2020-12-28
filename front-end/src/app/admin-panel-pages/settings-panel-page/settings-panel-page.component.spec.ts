import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPanelPageComponent } from './settings-panel-page.component';

describe('SettingsPanelPageComponent', () => {
  let component: SettingsPanelPageComponent;
  let fixture: ComponentFixture<SettingsPanelPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsPanelPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPanelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
