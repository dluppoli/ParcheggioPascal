import { Database } from "../models/Database";
import { Veicolo } from "../models/Veicolo";

export class ParcheggiController
{
    private db : Database;
    constructor()
    {
        this.db = new Database();
    }

    getAll() : Veicolo[]
    {
        return this.db.parcheggio.veicoli.filter(v => v.uscita==undefined);
    }

    getNumber() : number
    {
        return this.getAll().length;
    }

    addVeicolo(targa:string): boolean
    {
        return true;
    }
}