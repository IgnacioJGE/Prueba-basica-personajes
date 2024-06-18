import mongoose from "npm:mongoose@7.6.3"
import {serieopeli} from "../types.ts"


const Schema = mongoose.Schema;

const serieopeliSchema= new Schema({
    name:{type:String,required:true},
    tipo:{type:String,enum:["show","film"],required:true},
    cast:{type:[String],required:true}
},{timestamps:true})

export type  tiposeriepeli= mongoose.Document & (serieopeli)

export const ModeloSerieopeli= mongoose.model<tiposeriepeli>("Series o Pelis",serieopeliSchema)
