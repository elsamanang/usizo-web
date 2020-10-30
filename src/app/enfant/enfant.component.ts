import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Enfant } from '../models/enfant';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-enfant',
  templateUrl: './enfant.component.html',
  styleUrls: ['./enfant.component.css']
})
export class EnfantComponent implements OnInit {

  ref: AngularFirestoreCollection<Enfant>;
  enfants: Observable<Enfant[]>;

  constructor(private serviceCrud: CrudService,
    private router: Router,
    private afs: AngularFirestore) { }

  ngOnInit() {
    this.enfants = this.serviceCrud.colId$('enfant');
  }

  delete(uid){
    this.afs.doc('enfant/'+uid).delete();
  }

  details(uid) {
    this.router.navigate(['/enfant/' + uid]);
  }

}
