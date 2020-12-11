import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacialExpressionComponent } from './facial-expression.component';

describe('FacialExpressionComponent', () => {
  let component: FacialExpressionComponent;
  let fixture: ComponentFixture<FacialExpressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacialExpressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacialExpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
