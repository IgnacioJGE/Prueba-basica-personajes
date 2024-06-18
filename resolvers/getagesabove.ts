import {Request,Response} from "npm:express@4.18.2"
import {ModeloPersonaje} from "../db/personajes.ts"




export default async  function getagesAbove(req:Request,res:Response){

    const age= req.query.age
    if(!age||age==undefined){
        res.status(500).send("Error, falta edad")
    }
const allpj= await ModeloPersonaje.find()

const edadsuperior = allpj.filter((char)=> char.age>age)

const mostrar= edadsuperior.map((char)=>({
    name:char.name,
    age:char.age,
    ...(char.show? 
        {show:char.show}:
        {film:char.film}
    )
}))

res.status(200).send(mostrar)

}