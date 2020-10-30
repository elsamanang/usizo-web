import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Bracelet } from '../models/bracelet';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-bracelet',
  templateUrl: './bracelet.component.html',
  styleUrls: ['./bracelet.component.css']
})
export class BraceletComponent implements OnInit {

  ref: AngularFirestoreCollection<Bracelet>;
  bracelets: Observable<Bracelet[]>;

  constructor(private serviceCrud: CrudService,
    private router: Router,
    private afs: AngularFirestore) { }

  ngOnInit() {
    this.bracelets = this.serviceCrud.colId$('bracelet');
  }

  delete(uid){
    this.afs.doc('bracelet/'+uid).delete();
  }

  details(uid) {
    this.router.navigate(['/bracelet/' + uid]);
  }

}
