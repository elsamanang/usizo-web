import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Bracelet } from '../models/bracelet';
import { Enfant } from '../models/enfant';
import { CrudService } from '../services/crud.service';
import uid from 'uid';

@Component({
  selector: 'app-add-enfant',
  templateUrl: './add-enfant.component.html',
  styleUrls: ['./add-enfant.component.css']
})
export class AddEnfantComponent implements OnInit {

  enfantForm: FormGroup;
  bracelets: Observable<Bracelet[]>;
  refImage: any;
  uid: string;
  downloadURL: Observable<string>;

  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    private serviceCrud: CrudService,
    private storage : AngularFireStorage) { }

  ngOnInit() {
    this.bracelets = this.serviceCrud.getAll('bracelet');
    this.initForm();
    this.uid = uid(32);
  }

  initForm() {
    this.enfantForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      postnom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      pere: ['', [Validators.required]],
      mere: ['', [Validators.required]],
      naissance: ['', [Validators.required]],
      bracelet: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const nom = this.enfantForm.get('nom').value;
    const postnom = this.enfantForm.get('postnom').value;
    const prenom = this.enfantForm.get('prenom').value;
    const pere = this.enfantForm.get('pere').value;
    const mere = this.enfantForm.get('mere').value;
    const naissance = this.enfantForm.get('naissance').value;
    const bracelet = this.enfantForm.get('bracelet').value;
    const data: Enfant = {
      uid: this.uid,
      nom: nom,
      postnom: postnom,
      prenom: prenom,
      pere: pere,
      mere: mere,
      naissance: naissance,
      photo: this.refImage,
      bracelet: null
      
    }

    this.serviceCrud.One<Bracelet>("bracelet/", bracelet).subscribe(enc =>{
      data.bracelet = enc;
      this.serviceCrud.create('enfant', data, data.uid).then((result) => {
        this.router.navigate(['/enfants']);
      }).catch((error) => {
        window.alert("echec d'ajout");
      });;
    });
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'bracelet/'+ this.uid;
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
