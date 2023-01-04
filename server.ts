import { NextFunction } from "express";
import http from "http";
import cors from "cors";
import express, { Express } from "express";
import { Poetry } from "./interface/poetry";
import { insertPoetry, getPoetries, deletePoetry } from "./services/mongodb";

const app:Express = express();

/** Server */
// const httpServer = http.createServer(app);
// const PORT = process.env.PORT ?? 6060;
// httpServer.listen(PORT, () => {
//   console.log(`The server is running on port ${PORT}`);
//   console.log("http://localhost:" + PORT);
// });

app.listen(7000, function() {
    console.log('server is up on:')
    console.log('http://localhost:7000')
})

app.use(express.urlencoded({ extended: false })); /** Parse the request */
app.use(express.json()); /** Takes care of JSON data */
app.use(cors());/* Enable All CORS request (Cross Origin Resource Sharing) */


app.get('/', (req, res) => {
  res.send('Hello from node-poetry server!')
})

// get all poems from DB
app.get('/poetries', async (req, res, next) => { 
    return res.status(200).json({
      message: `returning all db poetries`,
      data: await getPoetries()
    });
})

// insert 1 poem to DB
app.post('/poetry', async (req, res, next) => { 
  // let poetry = req.body as Poetry; // get poetry data
  const mongoDbQuery:any = await insertPoetry(req.body as Poetry); // insert poetry to database
  return res.status(200).json({
    message: `A document was inserted with the _id: ${mongoDbQuery['insertedId']}`,
    data: {
      _id: mongoDbQuery['insertedId']
    }
  });
})

// delete 1 poem from DB
app.delete('/poetry/:_id', async (req, res, next) => { 
  return res.status(200).json({
    message: `document is been deleted.`,
    data: await deletePoetry(req.params._id)
  });
})

/** RULES OF OUR API */
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // set the CORS policy
//   res.header(
//     "Access-Control-Allow-Headers",
//     "origin, X-Requested-With,Content-Type,Accept, Authorization"
//   ); // set the CORS headers
//   // set the CORS method headers
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
//     return res.status(200).json({});
//   }
//   next();
// });

/** Error handling */
app.use((req, res, next) => {
  // const error = new Error('There is nothing here.!!!1');
  // return res.status(404).json({
  //     message: error.message,
  //     apiList: rover.getRoutesList()
  // });

  // res.status(404).render("404", { routesList: rover.getRoutesList() });
});