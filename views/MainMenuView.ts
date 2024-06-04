import * as rl from 'readline-sync'
import { ParcheggiController, ParcheggiControllerResult } from '../controllers/ParcheggiController';
import { Veicolo } from '../models/Veicolo';

export class MainMenuView
{
    static show() : void
    {
        let controller = new ParcheggiController();

        let scelta : number = 0;
        let targa: string = "";
        let results : Veicolo[] = [];
        do
        {
            console.log('GESTIONE PARCHEGGIO ACME.INC')
            console.log('----------------------------')
            console.log('')
            console.log('1 - Elenco veicoli')
            console.log('2 - Numero veicoli presenti')
            console.log('3 - Entrata veicolo')
            console.log('4 - Uscita veicolo')
            console.log('5 - Ricerca veicolo')
            console.log('')
            console.log('9 - Esci')
            console.log('')

            scelta = rl.questionInt('Inserire la scelta:')
            console.log('')
            switch(scelta)
            {
                case 1:
                    results = controller.getAll()
                    if(results.length>0) 
                        results.forEach(v => console.log(v.getInfo()) )
                    else
                        console.log('Nessun veicolo presente')
                    break;
                case 2:
                    console.log(`Sono presenti ${controller.getNumber()} veicoli`)
                    break;
                case 3:
                    targa = rl.question('Inserire la targa');
                    switch(controller.addVeicolo(targa))
                    {
                        case ParcheggiControllerResult.Ok:
                            console.log('Veicolo inserito con successo');
                            break;
                        case ParcheggiControllerResult.VeicoloGiaPresente:
                            console.log('Veicolo già presente');
                            break;
                        case ParcheggiControllerResult.ParcheggioPieno:
                            console.log('Parcheggio pieno')
                            break;
                        default:
                            console.log('Errore non definito');
                    }
                    break;
                case 4:
                    targa = rl.question('Inserire la targa');
                    
                    let result = controller.exitVeicolo(targa)
                    if( result instanceof Veicolo )
                    {
                        console.log(`Veicolo uscito con successo.`)
                        console.log(result.getInfo())   
                    }
                    else
                    {                    
                        switch(result)
                        {
                            case ParcheggiControllerResult.VeicoloNonTrovato:
                                console.log('Veicolo non trovato');
                                break;
                            default:
                                console.log('Errore non definito');
                        }
                    }
                    break;
                case 5:
                    targa = rl.question('Inserire la targa');
                    results = controller.getSosteVeicolo(targa)
                    if( results.length>0) 
                        results.forEach(v => console.log(v.getInfo()) )
                    else
                        console.log('Veicolo non trovato')
                    break;
                case 9:
                    break;
                default:
                    console.log('Inserire un numero valido');
            }
            console.log('\n\n')
        } while (scelta!=9)
    }
}