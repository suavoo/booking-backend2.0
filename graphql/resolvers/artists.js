const { AuthenticationError, UserInputError } = require('apollo-server');


const Artist = require('../../models/Artist');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Query: {
        async getArtists(_, { userId }, context) {
            const user = checkAuth(context);

            try {
                const preArtists = await Artist.find().sort({ name: 1 });
                const artists = await preArtists.filter((a) => user.id === a.userId);
                return artists;
            } catch(err) {
                throw new Error(err);
            }
        },
        async getArtist(_, { artistId }, context) {
            const user = checkAuth(context);

            try {
                const artist = await Artist.findById(artistId);
                if (artist && artist.userId === user.id) {
                    return artist;
                } else {
                    throw new Error('Artist not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: { 
        async createArtist(_, { artistInput: { name, genre, technik, tel, email, page, iban, prozente } }, context) {
            const user = checkAuth(context);

            if (name.trim() === '') {
                throw new Error('Artist name must not be empty');
            }

            const newArtist = new Artist({
                name,
                userId: user.id,
                createdAt: new Date().toISOString(),
                genre,
                technik,
                tel,
                email,
                page,
                iban,
                prozente
            });

            const artist = await newArtist.save();

            return artist;
        },
        async deleteArtist(_, { artistId }, context) {
            const user = checkAuth(context);

            try {
                const artist = await Artist.findById(artistId);

                if (artist.userId === user.id) {
                    await artist.delete();
                    return 'Artist deleted';
                } else {
                    throw new Error('Authentification Error');
                }
                
            } catch (err) {
                throw new Error(err);
            }
        }
    }
};