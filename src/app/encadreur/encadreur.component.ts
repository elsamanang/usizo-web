import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Encadreur } from '../models/encadreur';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-encadreur',
  templateUrl: './encadreur.component.html',
  styleUrls: ['./encadreur.component.css']
})
export class EncadreurComponent implements OnInit {

  ref: AngularFirestoreCollection<Encadreur>;
  encadreurs: Observable<Encadreur[]>;

  constructor(private serviceCrud: CrudService,
    private router: Router) { }

  ngOnInit() {
    this.encadreurs = this.serviceCrud.colId$('encadreur');
  }

  details(uid: string) {
    this.router.navigate(['//' + uid]);

  }

}
