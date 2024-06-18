import { Request, Response } from "npm:express@4.18.2";
import { ModeloPersonaje } from "../db/personajes.ts";
import {ModeloSerieopeli} from "../db/seriesopelis.ts"
import mongoose from "npm:mongoose@7.6.3"


export default async function addPJtoSerieoPeli(req:Request,res:Response){
const idpj= req.query.iduser
const idshow=req.query.idshow
const idfilm=req.query.idfilm
if(idfilm==undefined&&idshow==undefined){
    res.status(405).send("Es necesario añadir el id de la serie o pelicula");
    return;
}
if(idfilm!=undefined&&idshow!=undefined){
    res.status(405).send("Solo se permite un id de pelicula o serie");
    return;
}
if(idpj==undefined){
    res.status(405).send("Id de personaje obligatorio");
    return;  
}
if (!mongoose.Types.ObjectId.isValid(idpj)) {
    return res.status(400).send("ID de personaje no válido");
  }
const pjalreadyesxists =  await ModeloPersonaje.findById(idpj);
if(!pjalreadyesxists){
    res.status(405).send("Personaje no existente");
    return;
}
if(idfilm!=undefined){
    if (!mongoose.Types.ObjectId.isValid(idfilm)) {
        return res.status(400).send("ID de la pelicula no válido");
      }
    const filmexists =  await ModeloSerieopeli.findById(idfilm);

    if(!filmexists){
        res.status(405).send("Pelicula no existente");
        return;
    }
    if(pjalreadyesxists.film!=filmexists.name){
        res.status(405).send("Pelicula y pelicula a la que pertence el personaje no coinciden");
        return; 
    }
    for (let index = 0; index < filmexists.cast.length; index++) {
        if(filmexists.cast.at(index)==idpj){
            res.status(405).send("Personaje ya existe en esta Pelicula");
            return; 
        }
        
    }

    filmexists.cast.push(idpj);
    filmexists.save()
    res.status(200).send({
        name:filmexists.name,
        tipo:filmexists.tipo,
        cast:filmexists.cast
    });
    return;

}
if(idshow!=undefined){
    if (!mongoose.Types.ObjectId.isValid(idshow)) {
        return res.status(400).send("ID de la serie no válido");
      }
    const showexists =  await ModeloSerieopeli.findById(idshow);
    if(!showexists){
        res.status(405).send("Serie no existente");
        return;
    }
    if(pjalreadyesxists.show!=showexists.name){
        res.status(405).send("Serie y serie a la que pertence el personaje no coinciden");
        return; 
    }
    for (let index = 0; index < showexists.cast.length; index++) {
        if(showexists.cast.at(index)==idpj){
            res.status(405).send("Personaje ya existe en esta Serie");
            return; 
        }
        
    }
    showexists.cast.push(idpj);
    showexists.save()
    res.status(200).send({
        name:showexists.name,
        tipo:showexists.tipo,
        cast:showexists.cast
    });
    return;
}


}