import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationLegalComponent } from './organization-legal.component';

describe('OrganizationLegalComponent', () => {
  let component: OrganizationLegalComponent;
  let fixture: ComponentFixture<OrganizationLegalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationLegalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
