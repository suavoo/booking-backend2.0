const usersResolver = require('./users');
const artistsResolvers = require('./artists');
const venueResolvers = require('./venues');
const projectResolvers = require('./projects');
const taskResolvers = require('./tasks');
const templateResolvers = require('./templates');
const templateTaskResolvers = require('./templateTasks');

module.exports = {
    Query: {
        ...artistsResolvers.Query,
        ...venueResolvers.Query,
        ...projectResolvers.Query,
        ...taskResolvers.Query,
        ...templateResolvers.Query
    },
    Mutation: {
        ...usersResolver.Mutation,
        ...artistsResolvers.Mutation,
        ...venueResolvers.Mutation,
        ...projectResolvers.Mutation,
        ...taskResolvers.Mutation,
        ...templateResolvers.Mutation,
        ...templateTaskResolvers.Mutation
    }
} 