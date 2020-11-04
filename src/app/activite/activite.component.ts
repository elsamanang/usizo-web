import { Component, OnInit } from '@angular/core';
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

  activites: Observable<Activite[]>;
  

  constructor(private serviceCrud: CrudService,
    private router: Router) { }

  ngOnInit() {
    this.activites = this.serviceCrud.getAll('activite');
  }

  delete(uid){
    this.serviceCrud.delete(uid,'activite');
  }

  details(uid) {
    this.router.navigate(['/activite/' + uid]);
  }

}
