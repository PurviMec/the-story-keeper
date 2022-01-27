const { User, Book} = require('../models');
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
    Query: {
  
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })// _id: context.user._id
                  .select("-__v -password")
                  .populate("borrowList")
                  .populate("favouriteList")
      
              return userData;
            }
            throw new AuthenticationError("Not logged in");
        },
        books: async () => {
            return Book.find()
                .select('-__v ')
                .populate('reviews')
        },
        book: async (parent,args, context, ) => {
            return Book.findOne({ _id: context.book._id })
                .select('-__v')
                .populate('reviews')
        },
        favouriteList: async (parents, args, context) => {
            return User.findOne({ username: context.user.username })
                .select('-__v -password')
                .populate('favouriteList');   
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError("Incorrect credentials");
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError("Incorrect credentials");
            }
      
            const token = signToken(user);
            return { token, user };
          },
          //addUser(username: String!, email: String!, password: String!) :Auth
          addUser: async (parent, args) => {
            try {
              const user = await User.create(args);
      
              const token = signToken(user);
              return { token, user };
            } 
            catch (err) {
              console.log(err);
            }
          },
          addBook: async (parent, args, context) => {
            const books = async () => {
              return Book.find()
                .select('-__v -password')
                .populate('borrowList')
                .populate('favouriteList');
            }
            if (context.user) {
              return Book.create({ title: args.title, description: args.description, author: args.author, publish: args.publish, genere: args.genere})
            }
            return books;
          },
      
          addReview: async (parent, args, context) => {
              if (context.user) {
                  const updatedUser = await User.findByIdAndUpdate (
                      { id: context.user._id},
                      { $push: { reviews: args.reviewText }},
                      { new: true, runValidators: true }
                  );

                  return updatedUser;
              }
          },
      
          //favouriteList(input:favouriteList!):User
          favouriteList: async (parent, args, context) => {
            if (context.user) {
              const updatedUser = await User.findByIdAndUpdate(
                { id: context.user._id },
                // take the input type to replace "body" as the arguement
                { $addToSet: { favouriteLists: args.input } },
                { new: true, runValidators: true }
              );
      
              return updatedUser;
            }
      
            throw new AuthenticationError("You need to be logged in!");
          },
      
          //removeFavouriteBook(bookId: ID!): User
          removeFavouriteBook: async (parent, args, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { favouriteLists: { bookId: args.bookId } } },
                { new: true }
              );
      
              return updatedUser;
            }
      
            throw new AuthenticationError("You need to be logged in!");
          },
          
          // borrowList(input:borrowList!):User
          borrowList: async (parent, args, context) => {
            if (context.user) {
              const updatedUser = await User.findByIdAndUpdate(
                { id: context.user._id },
                // take the input type to replace "body" as the arguement
                { $addToSet: { borrowLists: args.input } },
                { new: true, runValidators: true }
              );
      
              return updatedUser;
            }
      
            throw new AuthenticationError("You need to be logged in!");
          },      
    }
};

module.exports = resolvers;