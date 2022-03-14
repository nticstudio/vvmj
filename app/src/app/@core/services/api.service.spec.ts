import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get groupement have Libelle NUME = size 1', async () => {
    let data = await service.getGroupements('NUME');
    console.log(data);
    expect(data).toHaveSize(1);
  });

  it('get groupements', async () => {
    let data = await service.getGroupements();
    console.log(data.length);
    expect(data.length).toBeGreaterThan(1);
  });

  it('get etabs', async () => {
    let data = await service.getEtablissements();
    console.log(data.length);
    expect(data.length).toBeGreaterThan(1);
  });

  it('get eab for gh 09', async () => {
    let data = await service.getEtablissements("09");
    console.log(data.length);
    expect(data.length).toEqual(1);
  });


  it('get ufs for etab 1', async () => {
    let data = await service.getUFs("09");
    console.log(data.length);
    expect(data.length).toBeGreaterThan(46);
  });

  it('get visites', async () => {
    let data = await service.getVisites();
    console.log(data.length);
    expect(data.length).toHaveSize(0);
  });


});
