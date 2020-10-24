import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.bracelets = 1;
  }

}
