import cors from "cors";
import express, { Express } from "express";
import Poetry from "./interface/poetry";
import { poetriesRouter } from "./poetry.routes";
import { connectToDatabase } from "./services/mongodb";

const app:Express = express();

connectToDatabase()
  .then(()=> {

    app.use(express.urlencoded({ extended: false })); /** Parse the request */
    app.use(express.json()); /** Takes care of JSON data */
    app.use(cors());/* Enable All CORS request (Cross Origin Resource Sharing) */

    app.get('/', (req, res) => { res.send('Hello from node-poetry server!')})
    app.use('/poetries', poetriesRouter);

    app.listen(7000, function() {
      console.log('server is up on:')
      console.log('http://localhost:7000')
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });