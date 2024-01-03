import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetattendancesComponent } from './getattendances.component';

describe('GetattendancesComponent', () => {
  let component: GetattendancesComponent;
  let fixture: ComponentFixture<GetattendancesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetattendancesComponent]
    });
    fixture = TestBed.createComponent(GetattendancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
