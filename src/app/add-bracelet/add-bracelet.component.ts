import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import uid from 'uid';
import { Bracelet } from '../models/bracelet';

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
    private afs: AngularFirestore) { }

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
    this.afs.doc('bracelet/'+data.uid).set(data).then((result) => {
      this.router.navigate(['/bracelets']);
    }).catch((error) => {
      window.alert("echec d'ajout");
    })
  }

}
