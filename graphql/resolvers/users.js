const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../util/validators');
const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email
        }, 
        SECRET_KEY, 
        { expiresIn: '8h' }
    );
};

module.exports = {
    Mutation: {
        async login(_, { email, password }) {
            const {errors, valid} = validateLoginInput(email, password);

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            const user = await User.findOne({ email });

            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', { errors });
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            };
        },
        async register(_, 
            { 
                registerInput: { email, password, confirmPassword } 
            },
        ) 
            {
            // Validate user data
                const { valid, errors } = validateRegisterInput(email, password, confirmPassword);
                if (!valid) {
                    throw new UserInputError('Errors', { errors });
                } 

            // Make sure user doesnt already exist
                const user = await User.findOne({ email });
                if (user) {
                    throw new UserInputError('Email is taken', {
                        errors: {
                            email: 'This email is taken'
                        }
                    })
                }

            // hash password and create auth token
                password = await bcrypt.hash(password, 12);

                const newUser = new User({
                    email,
                    password,
                    createdAt: new Date().toISOString()
                });

                const res = await newUser.save();

                const token = generateToken(res);

                return {
                    ...res._doc,
                    id: res._id,
                    token
                };
            }
    }
}