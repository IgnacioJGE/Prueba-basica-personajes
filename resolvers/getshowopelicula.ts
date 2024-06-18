import {ModeloSerieopeli} from "../db/seriesopelis.ts"
import {Request,Response} from "npm:express@4.18.2"
import { ModeloPersonaje } from "../db/personajes.ts";
import mongoose from "npm:mongoose@7.6.3"



async function getcast(id:string){
const nombre= await ModeloSerieopeli.findById(id);
return nombre?.name
}

export default async function getSerieoPeli(req:Request,res:Response){
const idshow= req.query.idshow;
const idfilm= req.query.idfilm;

if(idshow==undefined&&idfilm==undefined){
    res.status(407).send("Es obligatorio incluir el id de la pelicula o serie");
    return;
}
if(idshow!=undefined){
if(!mongoose.Types.ObjectId.isValid(idshow)){
    res.status(407).send("El id de la serie es incorrecto");
    return;
}
const showexists= await ModeloSerieopeli.findById(idshow);
if(!showexists){
    res.status(407).send("Esta serie no existe");
    return;
}
let castshow:string[]=[];

for (let index = 0; index < showexists.cast.length; index++) {
    const person= await ModeloPersonaje.findById(showexists.cast.at(index))
    if(person!=undefined){
        castshow.push(person.name)
    }
}
res.status(200).send({
    name:showexists.name,
    tipo:showexists.tipo,
    cast:castshow
})
}

if(idfilm!=undefined){
    if(!mongoose.Types.ObjectId.isValid(idfilm)){
        res.status(407).send("El id de la pelicula es incorrecto");
        return;
    }
    const filmexists= await ModeloSerieopeli.findById(idfilm);
    if(!filmexists){
        res.status(407).send("Esta pelicula no existe");
        return;
    }
    let castshow:string[]=[];

for (let index = 0; index < filmexists.cast.length; index++) {
    const person= await ModeloPersonaje.findById(filmexists.cast.at(index))
    if(person!=undefined){
        castshow.push(person.name)
    }
}
    res.status(200).send({
        name:filmexists.name,
        tipo:filmexists.tipo,
        cast:castshow
    })
    }

}