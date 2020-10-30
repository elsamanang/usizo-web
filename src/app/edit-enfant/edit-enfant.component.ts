import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Bracelet } from '../models/bracelet';
import { Enfant } from '../models/enfant';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-edit-enfant',
  templateUrl: './edit-enfant.component.html',
  styleUrls: ['./edit-enfant.component.css']
})
export class EditEnfantComponent implements OnInit {

  enfantForm: FormGroup;
  bracelets: Observable<Bracelet[]>;
  refImage: any;
  uid: string;
  downloadURL: Observable<string>;
  enfant: Observable<Enfant>;

  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private serviceCrud: CrudService,
    private storage : AngularFireStorage,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.bracelets = this.serviceCrud.colId$('bracelet');
    this.uid = this.route.snapshot.paramMap.get('id');
    this.enfant = this.serviceCrud.doc$<Enfant>('enfant/'+this.uid);
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

    this.serviceCrud.doc$<Bracelet>("bracelet/"+bracelet).subscribe(enc =>{
      data.bracelet = enc;
      this.afs.doc('enfant/'+data.uid).set(data).then((result) => {
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
