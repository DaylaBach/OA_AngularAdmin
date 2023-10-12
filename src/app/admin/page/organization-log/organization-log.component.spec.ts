import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationLogComponent } from './organization-log.component';

describe('OrganizationLogComponent', () => {
  let component: OrganizationLogComponent;
  let fixture: ComponentFixture<OrganizationLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
