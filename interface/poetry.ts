// define the data model reflected in the form
class Poetry {
    constructor(
      public title: string,
      public author: string,
      public content: string
    ) { }
  }

export { Poetry }