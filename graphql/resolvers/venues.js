const { AuthenticationError, UserInputError } = require('apollo-server');


const Venue = require('../../models/Venue');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Query: {
        async getVenues(_, { userId }, context) {
            const user = checkAuth(context);

            try {
                const preVenues = await Venue.find().sort({ name: 1 });
                const venues = await preVenues.filter((v) => user.id === v.userId);
                return venues;
            } catch(err) {
                throw new Error(err);
            }
        },
        async getVenue(_, { venueId }, context) {
            const user = checkAuth(context);

            try {
                const venue = await Venue.findById(venueId);
                if (venue && venue.userId === user.id) {
                    return venue;
                } else {
                    throw new Error('Venue not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: { 
        async createVenue(_, { venueInput: { name, adress, city, region, country, contactname, tel, email, technik, time, note } }, context) {
            const user = checkAuth(context);

            if (name.trim() === '') {
                throw new Error('Venue name must not be empty');
            }

            const newVenue = new Venue({
                name,
                userId: user.id,
                createdAt: new Date().toISOString(),
                adress,
                city,
                region,
                country,
                contactname,
                tel,
                email,
                technik,
                time,
                note
            });

            const venue = await newVenue.save();

            return venue;
        },
        async deleteVenue(_, { venueId }, context) {
            const user = checkAuth(context);

            try {
                const venue = await Venue.findById(venueId);

                if (venue.userId === user.id) {
                    await venue.delete();
                    return 'Venue deleted';
                } else {
                    throw new Error('Authentification Error');
                }
                
            } catch (err) {
                throw new Error(err);
            }
        }
    }
};