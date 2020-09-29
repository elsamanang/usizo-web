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
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
