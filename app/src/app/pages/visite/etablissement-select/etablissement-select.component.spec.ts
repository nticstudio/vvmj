import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementSelectComponent } from './etablissement-select.component';

describe('EtablissementSelectComponent', () => {
  let component: EtablissementSelectComponent;
  let fixture: ComponentFixture<EtablissementSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtablissementSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablissementSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
