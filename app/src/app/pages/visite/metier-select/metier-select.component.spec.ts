import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetierSelectComponent } from './metier-select.component';

describe('MetierSelectComponent', () => {
  let component: MetierSelectComponent;
  let fixture: ComponentFixture<MetierSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetierSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetierSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
