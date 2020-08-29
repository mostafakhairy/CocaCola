import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminMacthesComponent } from './admin-macthes.component';



describe('PredictWinComponent', () => {
  let component: AdminMacthesComponent;
  let fixture: ComponentFixture<AdminMacthesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMacthesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMacthesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
