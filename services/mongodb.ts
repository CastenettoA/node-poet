import * as MongoDB from 'mongodb'
import { Poetry } from '../interface/poetry';

// init connection to mongodb ngPoetryDB database
let client:any = null;

async function connectToDB() {
    try {
        client = new MongoDB.MongoClient('mongodb+srv://ngPoetryDB:U6pw7NuKxIXfXifw@ngpoetry.w6cuuop.mongodb.net/?retryWrites=true&w=majority');
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
}

async function insertPoetry(poetry:Poetry) {
    try {
      connectToDB();
      const db = client.db('ngPoetryDB');
      const res = await db.collection('poetries').insertOne(poetry);
      client.close();
      return res;
      
    } catch (error) {
      console.error(error);
      return error;
    }
  }

async function getPoetries() {
  try {
    connectToDB();
    const db = client.db('ngPoetryDB');
    const poetries = await db.collection('poetries').find().toArray();
    client.close();
    return poetries;

  } catch (error) {
    console.error(error);
    return error;
  }
}

async function deletePoetry(_id: string) {
  try {
    connectToDB();
    const db = client.db('ngPoetryDB');
    const r = await db.collection('poetries').deleteOne({ _id: new MongoDB.ObjectId(_id) })
    client.close();
    return r;

  } catch (error) {
    console.error(error);
    return error;
  }
}

export { insertPoetry, getPoetries, deletePoetry }