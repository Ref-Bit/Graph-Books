const graphql = require('graphql');
const _ = require('lodash'); // Call data locally
const data = require('./data.json'); // Dummy data
const Book = require('../models/book');
const Author = require('../models/author');


const{ 
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
   } = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args){
        // console.log(parent);
        // return _.find(data.authors, {id: parent.authorId}) // find locally - with no db
        return Author.findById(parent.authorId)
      }
    }
  }),
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        // console.log(parent);
        // return _.filter(data.books, {authorId: parent.id}) // find locally - with no db
        return Book.find({authorId: parent.id})
      }
    }
  }),
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: {type: GraphQLID},
      },
      resolve(parent,args){
        //code to get data from db/other source
        // return _.find(data.books, {id: args.id}) // find locally - with no db
        return Book.findById(args.id)
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: {type: GraphQLID},
      },
      resolve(parent,args){
        //code to get data from db/other source
        // return _.find(data.authors, {id: args.id}) // find locally - with no db
        return Author.findById(args.id)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(){
        //code to get data from db/other source
        // return data.books; // find locally - with no db
        return Book.find({})
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(){
        //code to get data from db/other source
        // return data.authors; // find locally - with no db
        return Author.find({})
      }
    }
  } 
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)},
      },
      resolve(parent, args){
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
}); 