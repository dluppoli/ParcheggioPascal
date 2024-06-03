import { Veicolo } from "./Veicolo";

export class Parcheggio
{
    veicoli:Veicolo[];

    constructor(public nome:string, public indirizzo:string, public capienza:number, public tariffaOraria:number)
    {
        this.veicoli = [];
    }
}