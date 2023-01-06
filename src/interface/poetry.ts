import { ObjectId } from "mongodb";

// define the data model reflected in the form
export default class Poetry {
    constructor(
      public title: string,
      public author: string,
      public content: string,
      public _id?: ObjectId
    ) { }
  }
