import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesRequestComponent } from './places-request.component';

describe('PlacesRequestComponent', () => {
  let component: PlacesRequestComponent;
  let fixture: ComponentFixture<PlacesRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
