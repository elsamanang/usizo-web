import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CrudService } from '../services/crud.service';
import { finalize} from 'rxjs/operators';
import { Encadreur } from '../models/encadreur';
import { mainModule } from 'process';

@Component({
  selector: 'app-add-encadreur',
  templateUrl: './add-encadreur.component.html',
  styleUrls: ['./add-encadreur.component.css']
})
export class AddEncadreurComponent implements OnInit {

  encadreurForm: FormGroup;
  uid: string
  refImage: any;
  downloadURL: Observable<string>;
  id = require('angular-uid');

  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private storage : AngularFireStorage) { }

  ngOnInit() {
    this.initForm();
    this.uid = this.id(32);
    alert(this.uid);

  }

  initForm() {
    this.encadreurForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      date: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const nom = this.encadreurForm.get('nom').value;
    const prenom = this.encadreurForm.get('prenom').value;
    const email = this.encadreurForm.get('email').value;
    const date = this.encadreurForm.get('date').value;
    const adresse = this.encadreurForm.get('adresse').value;
    const phone = this.encadreurForm.get('phone').value;
    const password = this.id(8);
    const role = this.encadreurForm.get('role').value;

    const data: Encadreur = {
      uid: this.uid,
      nom: nom,
      prenom: prenom,
      mail: email,
      phone: phone,
      naissance: date,
      adresse: adresse,
      photo: this.refImage,
      mdp: password,
      role: role

    }
    this.afs.doc('encadreur/'+data.uid).set(data);
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'encadreur/'+ this.uid;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL())
    ).subscribe()
    task.snapshotChanges().subscribe(fileStock => {
      fileRef.getDownloadURL().subscribe(storageFile => {
        this.refImage = storageFile.toString();
        console.log(this.refImage)
      })
    })
  }

}
