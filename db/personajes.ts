import mongoose from "npm:mongoose@7.6.3"
import {personaje} from "../types.ts"

const Schema= mongoose.Schema;

const personajeSchema= new Schema({
name:{type:String,required:true},
age:{type:Number,required:true},
show:{type:String,required:false},
film:{type:String,required:false}
},
{timestamps:true}
);


export type tipopersonaje=mongoose.Document&(personaje)

export const ModeloPersonaje= mongoose.model<tipopersonaje>("Personajes",personajeSchema)

