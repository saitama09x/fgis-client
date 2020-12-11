import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmileToVoteCamerasComponent } from './smile-to-vote-cameras.component';

describe('SmileToVoteCamerasComponent', () => {
  let component: SmileToVoteCamerasComponent;
  let fixture: ComponentFixture<SmileToVoteCamerasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmileToVoteCamerasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmileToVoteCamerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
