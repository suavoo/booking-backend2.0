const { AuthenticationError, UserInputError } = require('apollo-server');

const Template = require('../../models/Template');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Mutation: {
        createTemplateTask: async (_, { templateTaskInput: { templateId, name, days, from, beforeOrAfter } }, context) => {
            const user = checkAuth(context);
            if (templateId.trim() === '') {
                throw new UserInputError('Empty input', {
                    errors: {
                        name: 'Template ID must not be empty'
                    }
                })
            }

            if (name.trim() === '') {
                throw new UserInputError('Empty input', {
                    errors: {
                        name: 'Template task name must not be empty'
                    }
                })
            }

            const template = await Template.findById(templateId);

            if (template) { 
                template.tasks.unshift({
                    templateId,
                    name,
                    createdAt: new Date().toISOString(),
                    days,
                    from,
                    beforeOrAfter
                })
                await template.save();
                return template;
            } else {
                throw new UserInputError('Template not found');
            }
        },
        async deleteTemplateTask(_, { templateId, templateTaskId }, context) {
            const user = checkAuth(context);

            const template = await Template.findById(templateId);

            if (template) {
                const taskIndex = template.tasks.findIndex((t) => t.id === templateTaskId);

                if (template.userId === user.id) {
                    template.tasks.splice(taskIndex, 1);
                    await template.save();
                    return template;
                } else {
                    throw new AuthenticationError('Action not permitted')
                }
            } else { 
                throw new UserInputError('Template not found');
            }
        }
    }
};