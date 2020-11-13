import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Encadreur } from '../models/encadreur';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-edit-encadreur',
  templateUrl: './edit-encadreur.component.html',
  styleUrls: ['./edit-encadreur.component.css']
})
export class EditEncadreurComponent implements OnInit {

  encadreurForm: FormGroup;
  uid: string
  refImage: any;
  downloadURL: Observable<string>;
  encadreur: Observable<Encadreur>;
  enc: Observable<Encadreur>
  ref: string;

  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private serviceCrud: CrudService,
    private storage : AngularFireStorage) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('id');
    this.encadreur = this.serviceCrud.One<Encadreur>('encadreur/',this.uid)
    this.initForm();
  }

  initForm() {
    this.encadreurForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      date: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const nom = this.encadreurForm.get('nom').value;
    const prenom = this.encadreurForm.get('prenom').value;
    const date = this.encadreurForm.get('date').value;
    const adresse = this.encadreurForm.get('adresse').value;
    const phone = this.encadreurForm.get('phone').value;
    const role = this.encadreurForm.get('role').value;

    const data: Encadreur = {
      uid: this.uid,
      nom: nom,
      prenom: prenom,
      mail: '',
      phone: phone,
      naissance: date,
      adresse: adresse,
      photo: this.refImage,
      mdp: '',
      role: role

    }
    this.serviceCrud.One<Encadreur>('encadreur/', this.uid).subscribe(encadreur => {
      data.mdp = encadreur.mdp;
      data.mail = encadreur.mail;
      this.serviceCrud.create('encadreur', data, data.uid).then((result) => {
        this.router.navigate(['/encadreurs']);
      }).catch((error) => {
        window.alert("echec d'ajout");
      });
    })
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
      })
    })
  }

}
