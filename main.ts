import express,{Request,Response} from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3"
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import adPJ from "./resolvers/addpersonaje.ts"
import getallPJ from "./resolvers/getallpersonajes.ts"
import getshoworfilm from "./resolvers/getfilorshow.ts"
import getagesAbove from "./resolvers/getagesabove.ts"
import getagesBelow from "./resolvers/getagesbelow.ts"
import addSeriepeli from "./resolvers/addserieopeli.ts"
import addPJtoSerieoPeli from "./resolvers/addPJtoSerieofilm.ts"
import getSerieoPeli from "./resolvers/getshowopelicula.ts"
import getallSeries from "./resolvers/getallshows.ts"
import getallFilms from "./resolvers/getallfilms.ts"



const env=await load()
const MONGO_URL=env.MONGO_URL||Deno.env.get("MONGO_URL")
const PORT=env.PORT||Deno.env.get("PORT")||3000

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);

}

try {
  await mongoose.connect(MONGO_URL,{
    serverSelectionTimeoutMS: 50000
  });
  console.info("Mongo Concectado")
  const app= express();
  app.use(express.json())
  app.post("/addPersoanje",adPJ)
  app.get("/getallPersonajes",getallPJ)
  app.get("/getfilmorshow",getshoworfilm)
  app.get("/getPersonajesAboveage",getagesAbove)
  app.get("/getPersonajesBelowage",getagesBelow)
  app.post("/addSerieoPeli",addSeriepeli)
  app.put("/addPersonajeaSerieoPeli",addPJtoSerieoPeli)
  app.get("/getSerieoPeli",getSerieoPeli)
  app.get("/getallShows",getallSeries)
  app.get("/getallfilms",getallFilms)




  app.listen(PORT,()=> console.info ((`Te estoy escuchando desde ${PORT}`)));

} catch (error) {
  console.error(error)

}
