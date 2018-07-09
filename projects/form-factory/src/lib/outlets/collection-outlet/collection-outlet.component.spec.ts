import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionOutletComponent } from './collection-outlet.component';

describe('CollectionOutletComponent', () => {
  let component: CollectionOutletComponent;
  let fixture: ComponentFixture<CollectionOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
