import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import uid from 'uid';
import { Bracelet } from '../models/bracelet';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-add-bracelet',
  templateUrl: './add-bracelet.component.html',
  styleUrls: ['./add-bracelet.component.css']
})
export class AddBraceletComponent implements OnInit {

  braceletForm: FormGroup;
  uid: string

  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    private serviceCrud: CrudService) { }

  ngOnInit() {
    this.initForm();
    this.uid = uid(32);
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
