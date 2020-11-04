import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Activite } from '../models/activite';
import { Encadreur } from '../models/encadreur';
import { Enfant } from '../models/enfant';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-edit-activite',
  templateUrl: './edit-activite.component.html',
  styleUrls: ['./edit-activite.component.css']
})
export class EditActiviteComponent implements OnInit {

  activiteId: string;
  activite: Observable<Activite>;
  enfants: Enfant[] = [];
  enfantActivite: Enfant;
  activiteForm: FormGroup;
  miniForm: FormGroup;
  enfantsListe: Observable<Enfant[]>;
  acti: Activite;
  encadreurs: Observable<Encadreur[]>;

  constructor(private serviceCrud: CrudService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.activiteId = this.route.snapshot.paramMap.get('id');
    this.activite =this.serviceCrud.One<Activite>('activite/',this.activiteId);
    this.enfantsListe = this.serviceCrud.getAll('enfant');
    this.serviceCrud.One<Activite>('activite/',this.activiteId).subscribe(activite =>{
      this.enfants = activite.enfants;
      this.acti = activite;
    });
    this.miniForm = this.formBuilder.group({
      id: ['', [Validators.required]]
    });
    this.encadreurs = this.serviceCrud.getAll('encadreur');
    this.initForm();
   
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
      uid: this.activiteId,
      nom: nom,
      date: date,
      lieu: lieu,
      encadreur: null,
      enfants: []
    }
    this.serviceCrud.One<Encadreur>("encadreur/", encadreur).subscribe(enc =>{
      data.encadreur = enc;
      this.serviceCrud.One<Activite>("activite/", this.activiteId).subscribe(acti => {
        data.enfants = acti.enfants;
      });
      this.serviceCrud.create('activite', data, data.uid).then((result) => {
        window.alert("modification");
      }).catch((error) => {
        window.alert("echec de modification");
      })
    })
  }

  ajoutEnfant() {
    const enfantId = this.miniForm.get('id').value;
    this.serviceCrud.One<Enfant>("enfant/", enfantId).subscribe(enfant => {
      this.enfantActivite = {
        uid: enfant.uid,
        nom: enfant.nom,
        postnom: enfant.postnom,
        prenom: enfant.prenom,
        pere: enfant.pere,
        mere: enfant.mere,
        naissance: enfant.naissance,
        photo: enfant.photo,
        bracelet: enfant.bracelet

      }
      this.acti.enfants.push(this.enfantActivite);
      this.serviceCrud.create('activite', this.acti, this.acti.uid)
      return true;
    })
    
  }

  retour() {
    this.router.navigate(['/activites']);
  }

}
