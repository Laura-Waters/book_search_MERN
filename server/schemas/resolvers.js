const { Book, User } = require('../models');

const resolvers = {
  Query: {
    getSingleUser: async (_, { user, params }) => {
      try {
        const foundUser = await User.findOne({
          $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        });

        return foundUser;
      } catch (error) {
        throw new Error('Cannot find a user with this id!');
      }
    },
  },
  Mutation: {
    addUser: async (_, { body }) => {
      try {
        const user = await User.create(body);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error('Something is wrong!');
      }
    },
    loginUser: async (_, { body }) => {
      const user = await User.findOne({ $or: [{ username: username }, { email: email }] }); 
      if (!user) {
        throw new Error('Cannot find this user');
      }  
      const correctPw = await user.isCorrectPassword(password);   
      if (!correctPw) {
        throw new Error('Wrong password!');
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_, { user, body }) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: body } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        throw new Error(err);
      }
    },
    removeBook: async (_, { bookId }, { user }) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
    
        if (!updatedUser) {
          throw new Error("Couldn't find user with this id!");
        }
        return updatedUser;
      } catch (err) {
        throw new Error(err);
      }
    }, 
  },   
};

module.exports = resolvers;