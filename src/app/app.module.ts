import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    RapportComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
