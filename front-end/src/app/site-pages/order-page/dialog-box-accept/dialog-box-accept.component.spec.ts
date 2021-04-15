import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxAcceptComponent } from './dialog-box-accept.component';

describe('DialogBoxAcceptComponent', () => {
  let component: DialogBoxAcceptComponent;
  let fixture: ComponentFixture<DialogBoxAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoxAcceptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
