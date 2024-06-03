export class Veicolo
{
    readonly targa:string;
    ingresso:Date;
    uscita:Date | undefined;
    importo:number | undefined;        

    constructor(targa:string)
    {
        this.targa = targa;
        this.ingresso = new Date();
    }
}