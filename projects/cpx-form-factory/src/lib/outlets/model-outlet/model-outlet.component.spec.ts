import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelOutletComponent } from './model-outlet.component';

describe('ItemPresentationOutletComponent', () => {
  let component: ModelOutletComponent;
  let fixture: ComponentFixture<ModelOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
