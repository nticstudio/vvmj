import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteNewComponent } from './visite-new.component';

describe('VisiteNewComponent', () => {
  let component: VisiteNewComponent;
  let fixture: ComponentFixture<VisiteNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisiteNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisiteNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
