import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkWinComponent } from './drink-win.component';

describe('DrinkWinComponent', () => {
  let component: DrinkWinComponent;
  let fixture: ComponentFixture<DrinkWinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkWinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
