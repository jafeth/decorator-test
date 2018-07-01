import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOutletComponent } from './item-outlet.component';

describe('ItemPresentationOutletComponent', () => {
  let component: ItemOutletComponent;
  let fixture: ComponentFixture<ItemOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
