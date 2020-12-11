import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmileToVoteComponent } from './smile-to-vote.component';

describe('SmileToVoteComponent', () => {
  let component: SmileToVoteComponent;
  let fixture: ComponentFixture<SmileToVoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmileToVoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmileToVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
