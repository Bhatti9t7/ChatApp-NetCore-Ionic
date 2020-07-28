import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactPage } from './add-contact.page';

describe('AddContactPage', () => {
  let component: AddContactPage;
  let fixture: ComponentFixture<AddContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContactPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
