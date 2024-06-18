import {ModeloSerieopeli} from "../db/seriesopelis.ts"
import {Request,Response} from "npm:express@4.18.2"
import mongoose from "npm:mongoose@7.6.3"
import {serieopeli} from "../types.ts"
import { ModeloPersonaje } from "../db/personajes.ts";



export default async function getallSeries(req:Request,res:Response){

const series= await ModeloSerieopeli.find({tipo:"show"})
if(!series){
    res.status(403).send("No se han encontrado series");
    return;
}
const seriesmostrar:serieopeli[]=[];
for (let index = 0; index < +series.length; index++) {
    const arraynombres:string[]=[]
    for (let index1 = 0; index1 < series.at(index)?.cast.length; index1++) {
        const personaje= await ModeloPersonaje.findById(series.at(index)?.cast.at(index1)) 
        arraynombres.push(personaje?.name)
    }
seriesmostrar.push({
    name:series.at(index)?.name,
    tipo:series.at(index)?.tipo,
    cast:arraynombres
    
})
res.status(200).send(seriesmostrar);
return; 
}
}