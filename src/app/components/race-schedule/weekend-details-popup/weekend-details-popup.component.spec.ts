import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekendDetailsPopupComponent } from './weekend-details-popup.component';

describe('WeekendDetailsPopupComponent', () => {
  let component: WeekendDetailsPopupComponent;
  let fixture: ComponentFixture<WeekendDetailsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekendDetailsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekendDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
