import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Alert } from '../models/alert';
import { Bracelet } from '../models/bracelet';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  ref: AngularFirestoreCollection<Alert>;
  alerts: ListAlert[];

  constructor(private serviceCrud: CrudService,
    private router: Router) { }

  ngOnInit() {
    this.serviceCrud.getAll('alert').subscribe(alerts => {
      alerts.forEach((alert: any) => {
        let data: ListAlert = {
          alert: alert,
          bracelet: null
        }
        this.serviceCrud.getAll('bracelet').subscribe(bracelets => {
          bracelets.forEach((bracelet: any) => {
            if(alert.numero == bracelet.phone) {
              data.bracelet = bracelet;
            }
          })
        })
        this.alerts.push(data)
      })
    })
  }

}

export class ListAlert {
  alert: Alert;
  bracelet: Bracelet;
}
