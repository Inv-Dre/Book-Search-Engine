const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');



const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },

        user: async (userId) =>{
            return User.findOne({ _id: userId});
        },

        me: async () =>{
            if(context.user){
                User.findOne({ _id: context.user._id});
            }
            throw AuthenticationError;
        },
    },

    Mutation: {
        addUser: async (parent, {username,email, password}) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email });
            
            if(!profile){
                throw AuthenticationError;
            }
            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw){
                throw AuthenticationError;
            }

            const token = signToken(user);
            return {token, user};
        },

        saveBook: async (parent, {userId, input}, context ) => {
            if (context.user){
                return User.findOneAndUpdate(
                    {_id: userId},
                    {$addToSet:{savedBooks: input},
                },
                {
                    new:true,
                    runValidators:true,
                }
                );
            }
        },

        removeBook: async (parent, {userId, bookId}, context ) => {
            if (context.user){
                return User.findOneAndUpdate(
                        {_id: userId},
                        { $pull: { savedBooks: {bookId}}},
                        { new:true}
                    );
            }
        },
    }
};

module.exports = resolvers;