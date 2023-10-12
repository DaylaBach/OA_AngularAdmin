import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityDateComponent } from './quantity-date.component';

describe('QuantityDateComponent', () => {
  let component: QuantityDateComponent;
  let fixture: ComponentFixture<QuantityDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantityDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
