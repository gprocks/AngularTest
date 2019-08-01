import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualiResultComponent } from './quali-result.component';

describe('QualiResultComponent', () => {
  let component: QualiResultComponent;
  let fixture: ComponentFixture<QualiResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualiResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualiResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
