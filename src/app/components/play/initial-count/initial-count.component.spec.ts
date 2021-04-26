import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialCountComponent } from './initial-count.component';

describe('InitialCountComponent', () => {
  let component: InitialCountComponent;
  let fixture: ComponentFixture<InitialCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
