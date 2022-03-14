import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApercuUserComponent } from './apercu-user.component';

describe('ApercuUserComponent', () => {
  let component: ApercuUserComponent;
  let fixture: ComponentFixture<ApercuUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApercuUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApercuUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
