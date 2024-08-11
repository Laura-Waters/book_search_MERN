const { bookSchema, User } = require('../models');
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getSingleUser: async (_, { user, params }) => {
      try {
        const foundUser = await User.findOne({
          $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        });

        if (!foundUser) {
          throw new Error('User not found');
        }

        return foundUser;
      } catch (error) {
        throw new Error(`Error finding user: ${error.message}`);
      }
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error(`Error adding user: ${error.message}`);
      }
    },
    loginUser: async (_, { body: { username, email, password } }) => {
      const user = await User.findOne({ $or: [{ username }, { email }] });

      if (!user) {
        throw new Error('User not found');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error('Incorrect password');
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
        throw new Error(`Error saving book: ${err.message}`);
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
          throw new Error("User not found");
        }

        return updatedUser;
      } catch (err) {
        throw new Error(`Error removing book: ${err.message}`);
      }
    },
  },
};

module.exports = resolvers;