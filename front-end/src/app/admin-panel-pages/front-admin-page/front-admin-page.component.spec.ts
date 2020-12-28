import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontAdminPageComponent } from './front-admin-page.component';

describe('FrontAdminPageComponent', () => {
  let component: FrontAdminPageComponent;
  let fixture: ComponentFixture<FrontAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontAdminPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
