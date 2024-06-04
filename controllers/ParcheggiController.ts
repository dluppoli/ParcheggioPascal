import { Database } from "../models/Database";
import { Veicolo } from "../models/Veicolo";

export enum ParcheggiControllerResult {Ok, VeicoloGiaPresente, VeicoloNonTrovato, ParcheggioPieno}

export class ParcheggiController
{
    private db : Database;
    constructor()
    {
        this.db = new Database();
    }

    private normalizzaTarga(targa: string) : string
    {
        return targa.trim().toUpperCase();
    }

    getAll() : Veicolo[]
    {
        return this.db.parcheggio.veicoli.filter(v => v.uscita==undefined);
    }

    getOne(targa:string) : Veicolo | undefined
    {
        return this.getAll().find(v=>v.targa==this.normalizzaTarga(targa));
    }

    getNumber() : number
    {
        return this.getAll().length;
    }

    addVeicolo(targa:string) : ParcheggiControllerResult
    {
        if(this.getNumber()==this.db.parcheggio.capienza) return ParcheggiControllerResult.ParcheggioPieno;
        if( this.getOne(targa) != undefined ) return ParcheggiControllerResult.VeicoloGiaPresente;
        this.db.parcheggio.veicoli.push(new Veicolo(this.normalizzaTarga(targa)))
        return ParcheggiControllerResult.Ok;
    }

    exitVeicolo(targa:string) : Veicolo | ParcheggiControllerResult
    {
        let candidate = this.getOne(targa);
        if(candidate==undefined) return ParcheggiControllerResult.VeicoloNonTrovato;
        candidate.uscita = new Date();
        
        let tempoTrascorsoSec = (candidate.uscita.getTime() - candidate.ingresso.getTime()) / 1000;
        let quartiOraTrascorsi = Math.ceil(tempoTrascorsoSec / (60*15));
        candidate.importo = this.db.parcheggio.tariffaOraria * quartiOraTrascorsi / 4
        candidate.importo = Math.round(candidate.importo * 100)/100;
        return candidate;
    }

    getSosteVeicolo(targa:string) : Veicolo[]
    {
        return this.db.parcheggio.veicoli.filter(v => v.targa==this.normalizzaTarga(targa));
    }
}