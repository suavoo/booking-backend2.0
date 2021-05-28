const usersResolver = require('./users');
const artistsResolvers = require('./artists');
const venueResolvers = require('./venues');
const projectResolvers = require('./projects');
const taskResolvers = require('./tasks');

module.exports = {
    Query: {
        ...artistsResolvers.Query,
        ...venueResolvers.Query,
        ...projectResolvers.Query,
        ...taskResolvers.Query
    },
    Mutation: {
        ...usersResolver.Mutation,
        ...artistsResolvers.Mutation,
        ...venueResolvers.Mutation,
        ...projectResolvers.Mutation,
        ...taskResolvers.Mutation
    }
} 