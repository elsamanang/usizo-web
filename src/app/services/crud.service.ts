import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private db: AngularFirestore) { }

  col<T>(ref: CollectionPredicate<T>, queryFn?) {
    return typeof ref === 'string' ? this.db.collection<T>(ref, queryFn) : ref;
  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.db.doc<T>(ref) : ref;
  }

  /**
   * 
   * @param ref 
   * @summary dataOfDocument
   */
  doc$<T>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref).snapshotChanges().pipe(map(doc => {
      return doc.payload.data() as T;
    }));
  }

  /**
   * 
   * @param ref 
   * @param queryFn 
   * @summary dataOfCollection
   */
  colId$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn).snapshotChanges().pipe(map(docs => {
      return docs.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }));
  }

  /**
   * 
   * @param ref 
   * @param champ 
   * @param valeur 
   * @summary resultOfEqualSearch
   */
  getEqual$<T>(ref: CollectionPredicate<T>, champ: string, valeur: any): Observable<T[]> {
    return this.col(ref, ref => ref.where(champ, '==', valeur)).snapshotChanges().pipe(map(docs => {
      return docs.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }));
  }
  
  /**
   * 
   * @param ref 
   * @param data 
   * @summary updateDocument
   */
  update<T>(ref: DocPredicate<T>, data: any) {
    return this.doc(ref).set({
      ...data
    });
  }

}
