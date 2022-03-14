import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionNewComponent } from './inscription-new.component';

describe('InscriptionNewComponent', () => {
  let component: InscriptionNewComponent;
  let fixture: ComponentFixture<InscriptionNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
