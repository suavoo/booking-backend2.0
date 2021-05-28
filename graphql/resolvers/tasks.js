const { AuthenticationError, UserInputError } = require('apollo-server');

const Project = require('../../models/Project');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Query: {
        async getTasks(_, { userId }, context) {
            const user = checkAuth(context);

            try {
                const preProjects = await Project.find();
                const projects = await preProjects.filter((p) => user.id === p.userId);
                const tasks = await projects.map((p) => p.artist);
                return tasks;
            } catch(err) {
                throw new Error(err);
            }
        },
        async getTask(_, { projectId, taskId }, context) {
            const user = checkAuth(context);

            try {
                const project = await Project.findById(projectId);
                const taskIndex = project.tasks.findIndex((t) => t.id === taskId);
                const task = await project.tasks[taskIndex];
                if (task && project.userId === user.id) {
                    return task;
                } else {
                    throw new Error('Task not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        createTask: async (_, { taskInput: { projectId, name, done, duedate, note } }, context) => {
            const user = checkAuth(context);
            if (name.trim() === '') {
                throw new UserInputError('Empty input', {
                    errors: {
                        name: 'Task name must not be empty'
                    }
                })
            }

            if (duedate.trim() === '') {
                throw new UserInputError('Empty input', {
                    errors: {
                        duedate: 'Task duedate must not be empty'
                    }
                })
            }

            const project = await Project.findById(projectId);

            if (project) { 
                project.tasks.unshift({
                    name,
                    projectId,
                    createdAt: new Date().toISOString(),
                    artist: project.artist,
                    venue: project.venue,
                    date: project.date,
                    time: project.time,
                    projectType: project.projectType,
                    done,
                    duedate,
                    note
                })
                await project.save();
                return project;
            } else {
                throw new UserInputError('Project not found');
            }
        },
        async deleteTask(_, { projectId, taskId }, context) {
            const user = checkAuth(context);

            const project = await Project.findById(projectId);

            if (project) {
                const taskIndex = project.tasks.findIndex((t) => t.id === taskId);

                if (project.userId === user.id) {
                    project.tasks.splice(taskIndex, 1);
                    await project.save();
                    return project;
                } else {
                    throw new AuthenticationError('Action not permitted')
                }
            } else { 
                throw new UserInputError('Project not found');
            }
        }
    }
};