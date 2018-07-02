import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoeiTemplateComponent } from './woei-template.component';

describe('WoeiTemplateComponent', () => {
  let component: WoeiTemplateComponent;
  let fixture: ComponentFixture<WoeiTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoeiTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoeiTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
