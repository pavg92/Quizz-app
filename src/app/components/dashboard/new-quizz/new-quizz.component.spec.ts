import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuizzComponent } from './new-quizz.component';

describe('NewQuizzComponent', () => {
  let component: NewQuizzComponent;
  let fixture: ComponentFixture<NewQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewQuizzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
