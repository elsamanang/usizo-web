import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase} from '@angular/fire/database';

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private db: AngularFirestore,
    private bdd: AngularFireDatabase) { }


    create(liste, data, uid) {
      const table = this.bdd.list(liste);
      return table.set(uid, data);

    }

    delete(uid, liste) {
      const table = this.bdd.list(liste);
      return table.remove(uid);
    }
    getAll<T>(liste) {
      return this.bdd.list(liste).valueChanges() as Observable<T[]>;
    }
    One<T>(liste, uid) {
      return this.bdd.object(`${liste}${uid}`).valueChanges() as unknown as Observable<T>
    }
}
