import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Activite } from '../models/activite';
import { Encadreur } from '../models/encadreur';
import { Enfant } from '../models/enfant';
import { CrudService } from '../services/crud.service';
import uid from 'uid';

@Component({
  selector: 'app-add-activite',
  templateUrl: './add-activite.component.html',
  styleUrls: ['./add-activite.component.css']
})
export class AddActiviteComponent implements OnInit {

  activiteForm: FormGroup;
  miniForm: FormGroup;
  uid: string;
  activiteId: string;
  encadreurs: Observable<Encadreur[]>;
  enfants: Observable<Enfant[]>;
  enfant: Enfant;
  enfantActivite: Enfant[];

  
  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private serviceCrud: CrudService) { }

  ngOnInit() {
    this.initForm();
    this.enfantActivite = [];
    this.activiteId = "0";
    this.uid = uid(32);
    this.encadreurs = this.serviceCrud.colId$('encadreur');
    this.enfants = this.serviceCrud.colId$('enfant');

    this.miniForm = this.formBuilder.group({
      id: ['', [Validators.required]]
    })
  }

  initForm() {
    this.activiteForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      date: ['', [Validators.required]],
      lieu: ['', [Validators.required]],
      encadreur: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const nom = this.activiteForm.get('nom').value;
    const date = this.activiteForm.get('date').value;
    const lieu = this.activiteForm.get('lieu').value;
    const encadreur = this.activiteForm.get('encadreur').value;
    const data: Activite = {
      uid: this.uid,
      nom: nom,
      date: date,
      lieu: lieu,
      encadreur: null,
      enfants: []
    }
    this.serviceCrud.doc$<Encadreur>("encadreur/"+encadreur).subscribe(enc =>{
      data.encadreur = enc;
      this.afs.doc('activite/'+data.uid).set(data).then((result) => {
        this.activiteId = data.uid;
      }).catch((error) => {
        window.alert("echec d'ajout");
      })
    })
  }

  ajoutEnfant() {
    const enfantId = this.miniForm.get('id').value;
    this.serviceCrud.doc$<Activite>("activite/"+this.uid).subscribe(active => {
      this.serviceCrud.doc$<Enfant>("enfant/"+enfantId).subscribe(enfant => {
        this.enfant = enfant;
        active.enfants.push(this.enfant);
        console.log(active.enfants)
      })
      this.afs.doc('activite/'+this.uid).set(active);
    })

  }


}
