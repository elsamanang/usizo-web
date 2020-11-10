import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Rapport } from '../models/rapport';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {

  ref: AngularFirestoreCollection<Rapport>;
  rapports: Observable<Rapport[]>;

  constructor(private serviceCrud: CrudService,
    private router: Router) { }

  ngOnInit() {
    this.rapports = this.serviceCrud.getAll('rapport');
  }

}
