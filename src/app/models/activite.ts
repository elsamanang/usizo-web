import { Encadreur } from './encadreur';
import { Enfant } from './enfant';

export class Activite {

    uid: string;
    nom: string;
    date: string;
    lieu: string;
    encadreur: Encadreur;
    enfants: Enfant[];

}