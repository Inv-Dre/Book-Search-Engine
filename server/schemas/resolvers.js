const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },

        user: async () =>{
            return User.findOne({ _id: userId});
        },

        me: async () =>{
            if(context.user){
                User.findOne({ _id: context.user._id});
            }
            throw AuthenticationError;
        },
    }
}