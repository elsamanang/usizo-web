import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { EncadreurComponent } from './encadreur/encadreur.component';
import { RoleComponent } from './role/role.component';
import { EnfantComponent } from './enfant/enfant.component';
import { AlertComponent } from './alert/alert.component';
import { BraceletComponent } from './bracelet/bracelet.component';
import { ActiviteComponent } from './activite/activite.component';
import { RapportComponent } from './rapport/rapport.component';
import { LoginComponent } from './login/login.component';
import { HeadComponent } from './head/head.component';
import { AddEncadreurComponent } from './add-encadreur/add-encadreur.component';
import { AddEnfantComponent } from './add-enfant/add-enfant.component';
import { AddActiviteComponent } from './add-activite/add-activite.component';
import { AddBraceletComponent } from './add-bracelet/add-bracelet.component';
import { EditBraceletComponent } from './edit-bracelet/edit-bracelet.component';
import { EditActiviteComponent } from './edit-activite/edit-activite.component';
import { EditEnfantComponent } from './edit-enfant/edit-enfant.component';
import { EditEncadreurComponent } from './edit-encadreur/edit-encadreur.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule} from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthentificationService } from './services/authentification.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'encadreurs',
    component: EncadreurComponent
  },
  {
    path: 'enfants',
    component: EnfantComponent
  },
  {
    path: 'activites',
    component: ActiviteComponent
  },
  {
    path: 'rapports',
    component: RapportComponent
  },
  {
    path: 'bracelets',
    component: BraceletComponent
  },
  {
    path: 'alertes',
    component: AlertComponent
  },
  {
    path: 'new-encadreur',
    component: AddEncadreurComponent
  },
  {
    path: 'new-enfant',
    component: AddEnfantComponent
  },
  {
    path: 'new-activite',
    component: AddActiviteComponent
  },
  {
    path: 'new-bracelet',
    component: AddBraceletComponent
  },
  {
    path: 'encadreur/:id',
    component: EditEncadreurComponent
  },
  {
    path: 'enfant/:id',
    component: EditEnfantComponent
  },
  {
    path: 'activite/:id',
    component: EditActiviteComponent
  },
  {
    path: 'bracelet/:id',
    component: EditBraceletComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    EncadreurComponent,
    RoleComponent,
    EnfantComponent,
    AlertComponent,
    BraceletComponent,
    ActiviteComponent,
    RapportComponent,
    LoginComponent,
    HeadComponent,
    AddEncadreurComponent,
    AddEnfantComponent,
    AddActiviteComponent,
    AddBraceletComponent,
    EditBraceletComponent,
    EditActiviteComponent,
    EditEnfantComponent,
    EditEncadreurComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule, 
    AngularFireStorageModule
  ],
  providers: [AuthentificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
