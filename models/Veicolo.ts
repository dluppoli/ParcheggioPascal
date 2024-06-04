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

    getInfo():string
    {
        let info = `${this.targa} - Ingresso: ${this.ingresso.toLocaleString('it')}`
        if( this.uscita!= undefined) info += ` - Uscita: ${this.uscita.toLocaleString('it')}`
        if( this.importo!= undefined) info += ` - ${this.importo}€`
        return info;
    }
}