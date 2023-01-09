// poetry routes
import express, { Express, Request, Response } from "express";
import { ObjectId } from "mongodb";
import Poetry from "./interface/poetry";
import { collections } from "./services/mongodb";

export const poetriesRouter = express.Router();


  
  // get all poems from DB
  poetriesRouter.get('/', async (req: Request, res: Response) => { 
    try {
        const poetries = (await collections.poetries?.find().toArray()) as Poetry[];
        res.status(200).send(poetries); // todo: if only 1 poetry return as Poetry[] (check...)
    } catch (error: any) {
        res.status(500).send(error.message);
    }
  })
  
  // get 1 poetry by _id from DB
  poetriesRouter.get('/:_id', async (req: Request, res: Response) => {
    const _id = req.params._id; 
  
    try {
      const query = { _id: new ObjectId(_id) };
      const game = (await collections.poetries?.findOne(query)) as Poetry;

      if (game) {
          res.status(200).send(game);
      }
  } catch (error: any) {
      res.status(404).send({res:`Unable to find matching document with id: ${req.params._id}`});
  }
  })
  
  // insert 1 poetry to DB
  poetriesRouter.post('/', async (req: Request, res: Response) => { 
    try {
        const newPoetry = req.body as Poetry;
        const result = await collections.poetries?.insertOne(newPoetry);

        result
            ? res.status(201).send({res: `Successfully created a new poetry with id ${result.insertedId}`})
            : res.status(500).send({res: "Failed to create a new poetry."});
    } catch (error: any) {
        console.error(error);
        res.status(400).send(error.message);
    }
  })
  
  // edit 1 poetry with the current _id
  poetriesRouter.put('/:_id', async (req: Request, res: Response) => {
    const _id = req?.params?._id;

    try {
        const updatedPoetry: Poetry = req.body as Poetry;
        const query = { _id: new ObjectId(_id) };
      
        const result = await collections.poetries?.updateOne(query, { $set: updatedPoetry });

        result
            ? res.status(200).send({ res: `Successfully updated poetry with id ${_id}`})
            : res.status(304).send({ res: `Poetry with id: ${_id} not updated`});
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
  })
  
  
  // delete 1 poetry from DB
  poetriesRouter.delete('/:_id', async (req: Request, res: Response) => { 
    const _id = req?.params?._id;

    try {
        const query = { _id: new ObjectId(_id) };
        const result = await collections.poetries?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send({res:`Successfully removed poetry with id ${_id}`});
        } else if (!result) {
            res.status(400).send({res:`Failed to remove poetry with id ${_id}`});
        } else if (!result.deletedCount) {
            res.status(404).send({res:`Poetry with id ${_id} does not exist`});
        }
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send({res: 'error', error: error.message});
    }
  })