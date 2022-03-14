import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDateService, NbWindowRef } from '@nebular/theme';
import { Visite } from 'src/app/@core/models/visite';
import { ApiService } from 'src/app/@core/services/api.service';

@Component({
  selector: 'app-visite-new',
  templateUrl: './visite-new.component.html',
  styleUrls: ['./visite-new.component.css']
})
export class VisiteNewComponent implements OnInit {
  visite: Visite;
  loading = false;

  constructor(private api: ApiService, private route: ActivatedRoute, private dateService: NbDateService<Date>) { 
    this.visite = new Visite();
  }

  ngOnInit(): void {
  }

}
