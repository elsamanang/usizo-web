import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private firebaseAuth: AngularFireAuth) { }

  AuthLogin(provider){
    return this.firebaseAuth.signInWithPopup(provider).then((result)=>{
      console.log('You have been successfully logged in!')
    }).catch((error)=>{
      console.log(error)
    })
  }

  //Sign up in with Email & Password
  SignUp(email : string, password : string){
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password).then((result) => {
      console.log("reussite !!! ")
    }).catch((error) => {
      window.alert(error.message);
    })
  }

  //Sign in with Email & Password
  SignIn(email : string, password : string) {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password).then((result) => {
        //  this.router.navigate(['<!-- enter your route name here -->']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }
}
