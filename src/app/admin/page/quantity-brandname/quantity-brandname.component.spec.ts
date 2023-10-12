import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityBrandnameComponent } from './quantity-brandname.component';

describe('QuantityBrandnameComponent', () => {
  let component: QuantityBrandnameComponent;
  let fixture: ComponentFixture<QuantityBrandnameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantityBrandnameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityBrandnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
