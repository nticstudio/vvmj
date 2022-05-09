import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLdapUserComponent } from './select-ldap-user.component';

describe('SelectUserComponent', () => {
  let component: SelectLdapUserComponent;
  let fixture: ComponentFixture<SelectLdapUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectLdapUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLdapUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
