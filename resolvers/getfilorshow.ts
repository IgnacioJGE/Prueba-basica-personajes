import {Request,Response} from "npm:express@4.18.2"
import {ModeloPersonaje} from "../db/personajes.ts"



export default async function getshoworfilm(req:Request,res:Response){

    try {
        const show= await  req.query.show
if(show==undefined){
     
    const personajesmongo= await ModeloPersonaje.find({film: { $exists: true }})
    const personajesmostrables= personajesmongo.map((char)=>({
        name:char.name,
        age:char.age,
        film:char.film,
    }))
    res.status(200).send(personajesmostrables)
}else{
    const personajesmongo= await ModeloPersonaje.find({show: { $exists: true }})
    const personajesmostrables= personajesmongo.map((char)=>({
        name:char.name,
        age:char.age,
        show:char.show,
  }))
    res.status(200).send(personajesmostrables)

}
    } catch (error) {
        res.status(500).send(error.message)

    }



}