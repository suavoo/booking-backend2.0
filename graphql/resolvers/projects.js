const { AuthenticationError, UserInputError } = require('apollo-server');


const Project = require('../../models/Project');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Query: {
        async getProjects(_, { userId }, context) {
            const user = checkAuth(context);

            try {
                const preProjects = await Project.find().sort({ createdAt: -1 });
                const projects = await preProjects.filter((p) => user.id === p.userId);
                return projects;
            } catch(err) {
                throw new Error(err);
            }
        },
        async getProject(_, { projectId }, context) {
            const user = checkAuth(context);

            try {
                const project = await Project.findById(projectId);
                if (project && project.userId === user.id) {
                    return project;
                } else {
                    throw new Error('Project not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: { 
        async createProject(_, { projectInput: { artist, venue, date, time, projectType, result, note1, note2, gage } }, context) {
            const user = checkAuth(context);

            if (artist.trim() === '') {
                throw new Error('Artist must not be empty');
            }

            if (venue.trim() === '') {
                throw new Error('Venue must not be empty');
            }

            if (date.trim() === '') {
                throw new Error('Date must not be empty');
            }

            const newProject = new Project({
                userId: user.id,
                createdAt: new Date().toISOString(),
                artist,
                venue,
                date,
                time,
                projectType,
                result,
                note1,
                note2,
                gage
            });

            const project = await newProject.save();

            return project;
        },
        async deleteProject(_, { projectId }, context) {
            const user = checkAuth(context);

            try {
                const project = await Project.findById(projectId);

                if (project.userId === user.id) {
                    await project.delete();
                    return 'Project deleted';
                } else {
                    throw new Error('Authentification Error');
                }
                
            } catch (err) {
                throw new Error(err);
            }
        }
    }
};