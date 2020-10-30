import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  ref: Encadreur;

  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private serviceCrud: CrudService,
    private storage : AngularFireStorage) { }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('id');
    this.encadreur = this.serviceCrud.doc$<Encadreur>('encadreur/'+this.uid);
    this.initForm();
    this.serviceCrud.doc$<Encadreur>('encadreur/'+this.uid).subscribe(encadreur => {
      this.ref = encadreur;
    })
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
      mdp: this.ref.mdp,
      role: role

    }
    this.afs.doc('encadreur/'+data.uid).set(data).then((result) => {
      this.router.navigate(['/encadreurs']);
    }).catch((error) => {
      window.alert("echec d'ajout");
    });
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
