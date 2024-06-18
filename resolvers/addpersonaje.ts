import {Request,Response} from "npm:express@4.18.2"
import {ModeloPersonaje} from "../db/personajes.ts"

export default async  function adPJ(req:Request,res:Response){

    try { 
        const {name,age,show,film}= req.body;
        if(!name||!age){
            res.status(400).send("Nombre y edad obligatorias");

        }
        if(!show&&!film){
            res.status(410).send("Serie o pelicula obliatorio")
        }
        if(show&&film){
            res.status(403).send("El personaje solo puede estar en serie o pelicula")
        }
        let alreadyesxist=undefined;
        if(show){    
                 alreadyesxist= await ModeloPersonaje.findOne({age,name,show})
        }else{
             alreadyesxist= await ModeloPersonaje.findOne({age,name,film})
    }
if(alreadyesxist){
    res.status(401).send("Personaje ya existente");
    return;
}
if(show){
    const nuevopj= new ModeloPersonaje({name,age,show})
    await nuevopj.save();
    res.status(200).send({
        name:nuevopj.name,
        age:nuevopj.age,
        show:nuevopj.show,
    });
}else{
    const nuevopj= new ModeloPersonaje({name,age,film})
    await nuevopj.save();
    res.status(200).send({
        name:nuevopj.name,
        age:nuevopj.age,
        film:nuevopj.film,
    });
}
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
} 