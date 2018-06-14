import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayItemOutletComponent } from './display-item-outlet.component';

describe('CpxElementOutletComponent', () => {
  let component: DisplayItemOutletComponent;
  let fixture: ComponentFixture<DisplayItemOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayItemOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayItemOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
