
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { QuantityOrganizationLegalComponent } from './quantity-organization-legal.component';

describe('QuantityOrganizationLegalComponent', () => {
  let component: QuantityOrganizationLegalComponent;
  let fixture: ComponentFixture<QuantityOrganizationLegalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantityOrganizationLegalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityOrganizationLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
