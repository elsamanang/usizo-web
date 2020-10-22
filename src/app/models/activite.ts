import { Enfant } from './enfant';

export class Activite {

    uid: string;
    nom: string;
    date: Date;
    lieu: string;
    encadreur: string;
    enfants: Enfant[];

}