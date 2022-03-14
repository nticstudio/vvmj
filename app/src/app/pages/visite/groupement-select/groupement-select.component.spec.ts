import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupementSelectComponent } from './groupement-select.component';

describe('GroupementSelectComponent', () => {
  let component: GroupementSelectComponent;
  let fixture: ComponentFixture<GroupementSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupementSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupementSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
