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

// async function connectToDB() {
//     try {
//         client = new MongoDB.MongoClient('mongodb+srv://ngPoetryDB:U6pw7NuKxIXfXifw@ngpoetry.w6cuuop.mongodb.net/?retryWrites=true&w=majority');
//         await client.connect();
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.error(error);
//     }
// }

// async function insertPoetry(poetry:Poetry) {
//     try {
//       connectToDB();
//       const db = client.db('ngPoetryDB');
//       const res = await db.collection('poetries').insertOne(poetry);
//       client.close();
//       return res;
      
//     } catch (error) {
//       console.error(error);
//       return error;
//     }
//   }


// async function getPoetry(_id:string) {
//   try {
//     connectToDB();
//     const db = client.db('ngPoetryDB');

//     // check if the _id is a valid ObjectId
//     const isValid = MongoDB.ObjectId.isValid(_id);
//     if(!isValid) return { 'error': 'ObjectId is not valid so no poetry is found.'};

//     // search poetry in db
//     const r = await db.collection('poetries').find({ _id: new MongoDB.ObjectId(_id)}).toArray(); // todos...  
//     client.close();
//     return r;

//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// }

// async function editPoetry(_id:string, poetry: Poetry) {
//   try {
//     connectToDB();
//     const db = client.db('ngPoetryDB');

//     // check if the _id is a valid ObjectId
//     const isValid = MongoDB.ObjectId.isValid(_id);
//     if(!isValid) return { 'error': 'ObjectId is not valid so no poetry is update.'};

//       // search poetry in db and edit it with new data
//       const collection = db.collection('poetries');
//       await collection.findOneAndUpdate(
//         { _id: new MongoDB.ObjectId(_id) },
//         // { $set: { name: 'John Smith' } },
//         { $set: { 
//           title: poetry.title,
//           author: poetry.author,
//           content: poetry.content
//          } },
//         (err:any, result:any) => {
//           if (err) {
//             client.close();
//             return err;
//           }
//           client.close();
//           return result;
//         }
//       );

//   } catch (error) {
//     console.error(error);
//     return error;
//   }

// }

// async function getPoetries() {
//   try {
//     const poetries = await collections.poetries?.find().toArray();
//     return poetries;

//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// }

// async function deletePoetry(_id: string) {
//   try {
//     connectToDB();
//     const db = client.db('ngPoetryDB');
//     const r = await db.collection('poetries').deleteOne({ _id: new MongoDB.ObjectId(_id) })
//     client.close();
//     return r;

//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// }

// export { insertPoetry, getPoetry, getPoetries, editPoetry, deletePoetry }