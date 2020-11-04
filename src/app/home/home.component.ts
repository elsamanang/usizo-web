import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  encadreurs: number;
  bracelets: number;
  enfants: number;
  alerts: number

  constructor(private afs: AngularFirestore,
    private serviceCrud: CrudService) { }

  ngOnInit() {
    this.serviceCrud.getAll('bracelet').subscribe(bracelet => {
      this.bracelets = bracelet.length
    });
    this.serviceCrud.getAll('encadreur').subscribe(encadreur => {
      this.encadreurs = encadreur.length
    });
    this.serviceCrud.getAll('enfant').subscribe(enfant => {
      this.enfants = enfant.length
    });
    this.serviceCrud.getAll('alert').subscribe(alert => {
      this.alerts = alert.length
    })

  }

}
