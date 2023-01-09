import * as MongoDB from 'mongodb'
import * as dotenv from 'dotenv'
import Poetry  from '../interface/poetry';

export const collections: {
  poetries?: MongoDB.Collection
} = {}

export async function connectToDatabase() {
  dotenv.config();
  const client: MongoDB.MongoClient = new MongoDB.MongoClient(process.env.DB_CONN_STRING as string);        
  await client.connect();    
  const db: MongoDB.Db = client.db(process.env.DB_NAME);
  const poetryCollection: MongoDB.Collection = db.collection(process.env.POETRY_COLLECTION_NAME  as string);
  collections.poetries = poetryCollection;

  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${poetryCollection.collectionName}`);
}