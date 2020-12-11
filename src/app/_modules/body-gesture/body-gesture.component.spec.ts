import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyGestureComponent } from './body-gesture.component';

describe('BodyGestureComponent', () => {
  let component: BodyGestureComponent;
  let fixture: ComponentFixture<BodyGestureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyGestureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyGestureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
