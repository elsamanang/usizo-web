import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Bracelet } from '../models/bracelet';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-edit-bracelet',
  templateUrl: './edit-bracelet.component.html',
  styleUrls: ['./edit-bracelet.component.css']
})
export class EditBraceletComponent implements OnInit {

  braceletForm: FormGroup;
  uid: string;
  bracelet: Observable<Bracelet>;

  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private serviceCrud: CrudService) { }

  ngOnInit() {
    this.initForm();
    this.uid = this.route.snapshot.paramMap.get('id');
    this.bracelet = this.serviceCrud.One<Bracelet>('bracelet/',this.uid);
  }

  initForm() {
    this.braceletForm = this.formBuilder.group({
      bluetooth: ['', [Validators.required]],
      wifi: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    })
  }

  onSubmit() {
    const bluetooth = this.braceletForm.get('bluetooth').value;
    const wifi = this.braceletForm.get('wifi').value;
    const phone = this.braceletForm.get('phone').value;
    const data: Bracelet = {
      uid: this.uid,
      bluetooth: bluetooth,
      wifi: wifi,
      gps: '',
      phone: phone
    }
    this.serviceCrud.create('bracelet', data, data.uid).then((result) => {
      this.router.navigate(['/bracelets']);
    }).catch((error) => {
      window.alert("echec d'ajout");
    });
  }

}
