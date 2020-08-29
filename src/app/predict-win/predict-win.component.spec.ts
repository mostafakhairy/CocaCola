import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictWinComponent } from './predict-win.component';

describe('PredictWinComponent', () => {
  let component: PredictWinComponent;
  let fixture: ComponentFixture<PredictWinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictWinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
