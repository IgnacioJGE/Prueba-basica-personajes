import {Request,Response} from "npm:express@4.18.2"
import {ModeloPersonaje} from "../db/personajes.ts"



export default async function getallPJ(req:Request,res:Response){
try {

    const perosnajesmong= await ModeloPersonaje.find()

    const personajesmostrables= perosnajesmong.map((char)=>({
        name:char.name,
        age:char.age,
        ...(char.show?
            {show:char.show}
            :{film:char.film}
        )
    }));
    res.status(200).send(personajesmostrables)
} catch (error) {
    res.status(400).send(error.message)
    return;
}
}