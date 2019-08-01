import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultWeekendComponent } from './result-weekend.component';

describe('ResultWeekendComponent', () => {
  let component: ResultWeekendComponent;
  let fixture: ComponentFixture<ResultWeekendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultWeekendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultWeekendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
