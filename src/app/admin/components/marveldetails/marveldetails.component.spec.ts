import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarveldetailsComponent } from './marveldetails.component';

describe('MarveldetailsComponent', () => {
  let component: MarveldetailsComponent;
  let fixture: ComponentFixture<MarveldetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarveldetailsComponent]
    });
    fixture = TestBed.createComponent(MarveldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
