import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAddressComponent } from './detail-address.component';

describe('DetailAddressComponent', () => {
  let component: DetailAddressComponent;
  let fixture: ComponentFixture<DetailAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
