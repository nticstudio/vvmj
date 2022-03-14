import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniteSelectComponent } from './unite-select.component';

describe('UniteSelectComponent', () => {
  let component: UniteSelectComponent;
  let fixture: ComponentFixture<UniteSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniteSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniteSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
