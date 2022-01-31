const { User, Book} = require('../models');
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
    Query: {
      users: async () => {
        return User.find()
          .select('-__v -password')
          .populate('borrowList')
          .populate('favouriteList');
      },

      user: async (parents, args) => {
        const user = await User.findOne({ username: args.username })
        return user;
      },

      me: async (parent, args, context) => {
        if (context.user._id) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('borrowList')
            .populate('favoutiteList');
      
          return userData;
        }
      
        throw new AuthenticationError('Not logged in');
      },      
        books: async () => {
            return Book.find()
                .select('-__v ')
                .populate('reviews')
        },
        book: async (parent,args ) => {
          if(args._id){
            const bookData = await Book.findOne({ _id: args._id })
                .select('-__v')
                .populate('reviews')
            return bookData;    
          }
          throw new AuthenticationError('No book found with this id!');      
        },

        booksByGenere: async (parent,args ) => {
          return Book.find({ genere: args.genere })
              .select('-__v')
              .populate('reviews')
        },

        booksByAuthor: async (parent,args ) => {
          return Book.find({ author: args.author })
            .select('-__v')
            .populate('reviews')
        },
        booksByTitle: async (parent,args ) => {
          return Book.find({ title: args.title })
            .select('-__v')
            .populate('reviews')
        },
        favouriteList: async (parents, args) => {
          if(args.username){
            const list = await User.find({ username: args.username })
                .select('-__v -password')
                .populate('favouriteList');
            return list;
          } 
          throw new AuthenticationError('Please logIn or create account');       
        }
    },

    Mutation: {
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
      
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const correctPw = await user.isCorrectPassword(password);
      
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const token = signToken(user);
        return { token, user };
      },
          //addUser(username: String!, email: String!, password: String!) :Auth
        
        addUser: async (parent, args) => {
            
          const user = await User.create(args);
      
          const token = signToken(user);
          return { token, user };
            
      },
      addBook: async (parent, args) => {
        // const user = await User.findOne({email: args.email} )

        // if (user){
          const newBook = await Book.create(args);
          return newBook;
        // }
        // throw new AuthenticationError('You need to be logged in!');
        
        // const newBook = await Book.create({ title: args.title, description: args.description, author: args.author, publish: args.publish, genere: args.genere, rent: args.rent})
        //return newBook;
      
      },
      
       addReview: async (parent, args, context ) => {
        if (context.user) {
            
          const updatedBook = await Book.findOneAndUpdate(
            { _id: args.bookId },
            { $push: { reviews: { reviewText: args.reviewText, username: args.username } } },
            { new: true, runValidators: true }
          );
  
          return updatedBook;
        
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      
          //favouriteList(input:favouriteList!):User
      favouriteList: async (parent, { input }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { favouriteList: input } },
            { new: true, runValidators: true }
          );
            return updatedUser;
          }
        throw new AuthenticationError("You need to be logged in!");
      },

      removeFavouriteBook: async (parent, { bookId }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { favouriteList: { bookId: bookId } } },
            { new: true }
          );
          return updatedUser;
        }
        throw new AuthenticationError("You need to be logged in!");
      },
        
          
          // borrowList(input:borrowList!):User
      borrowList: async (parent, { input }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { borrowList: input } },
            { new: true, runValidators: true }
          );
          return updatedUser;
        }
        throw new AuthenticationError("You need to be logged in!");
      },
    }
    
};

module.exports = resolvers;