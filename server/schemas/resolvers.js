//const { User} = require('../models');
//const { signToken } = require("../utils/auth");
//const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
    Query: {
      helloWorld: () => {
        return 'Hello world!';
      }
  
        // me: async (parent, args, context) => {
        //     if (context.user) {
        //       const userData = await User.findOne({ _id: context.user._id })// _id: context.user._id
        //         .select("-__v -password")
        //         .populate("borrowList");
      
        //       return userData;
        //     }
        //     throw new AuthenticationError("Not logged in");
        //   },
    },

    // Mutation: {
    //     login: async (parent, { email, password }) => {
    //         const user = await User.findOne({ email });
      
    //         if (!user) {
    //           throw new AuthenticationError("Incorrect credentials");
    //         }
      
    //         const correctPw = await user.isCorrectPassword(password);
      
    //         if (!correctPw) {
    //           throw new AuthenticationError("Incorrect credentials");
    //         }
      
    //         const token = signToken(user);
    //         return { token, user };
    //       },
    //       //addUser(username: String!, email: String!, password: String!) :Auth
    //       addUser: async (parent, args) => {
    //         try {
    //           const user = await User.create(args);
      
    //           const token = signToken(user);
    //           return { token, user };
    //         } 
    //         catch (err) {
    //           console.log(err);
    //         }
    //       },
    // }
};

module.exports = resolvers;