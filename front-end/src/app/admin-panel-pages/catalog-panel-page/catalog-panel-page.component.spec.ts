import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogPanelPageComponent } from './catalog-panel-page.component';

describe('CatalogPanelPageComponent', () => {
  let component: CatalogPanelPageComponent;
  let fixture: ComponentFixture<CatalogPanelPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogPanelPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogPanelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
