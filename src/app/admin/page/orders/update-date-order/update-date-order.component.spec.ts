import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDateOrderComponent } from './update-date-order.component';

describe('UpdateDateOrderComponent', () => {
  let component: UpdateDateOrderComponent;
  let fixture: ComponentFixture<UpdateDateOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDateOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
