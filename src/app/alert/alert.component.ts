import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Alert } from '../models/alert';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  ref: AngularFirestoreCollection<Alert>;
  alerts: Observable<Alert[]>;

  constructor(private serviceCrud: CrudService,
    private router: Router) { }

  ngOnInit() {
    this.alerts = this.serviceCrud.colId$('alert');
  }

}
