import {ModeloSerieopeli} from "../db/seriesopelis.ts"
import {Request,Response} from "npm:express@4.18.2"



export default  async function addSeriepeli(req:Request,res:Response){
const {name,tipo,cast}=req.body;
if(!name||!cast||!tipo){
    res.status(403).send("Error datos incompletos");
    return;
}
if(tipo!="show"&&tipo!="film"){
    res.status(403).send("El tipo tiene que ser show o film");
    return;
}
const alreadyesxists= await ModeloSerieopeli.findOne({name:name,tipo:tipo})
if(alreadyesxists&&tipo=="show"){
    res.status(403).send("Serie ya Existente");
    return;
}
if(alreadyesxists&&tipo=="film"){
    res.status(403).send("Pelicula ya Existente");
    return;
}
const pelioserie = new ModeloSerieopeli({name:name,tipo:tipo,cast:cast})
await pelioserie.save()
res.status(200).send({
    name: name,
    tipo:tipo,
    cast:cast
})
return;
}