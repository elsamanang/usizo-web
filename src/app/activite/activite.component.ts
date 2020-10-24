import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Activite } from '../models/activite';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.css']
})
export class ActiviteComponent implements OnInit {

  ref: AngularFirestoreCollection<Activite>;
  activites: Observable<Activite[]>;

  constructor(private serviceCrud: CrudService,
    private router: Router) { }

  ngOnInit() {
    this.activites = this.serviceCrud.colId$('activite');
  }

}
