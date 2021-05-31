const { AuthenticationError, UserInputError } = require('apollo-server');


const Template = require('../../models/Template');
const checkAuth = require('../../util/check-auth');
const { BOOKING_USER } = require('../../config.js');

module.exports = {
    Query: {
        async getTemplates(_, { userId }, context) {
            const user = checkAuth(context);
            const bookingId = BOOKING_USER;

            try {
                const preTemplates = await Template.find().sort({ createdAt: -1 });
                const templates = await preTemplates.filter((t) => bookingId === t.userId);
                return templates;
            } catch(err) {
                throw new Error(err);
            }
        },
        async getUserTemplates(_, { userId }, context) {
            const user = checkAuth(context);

            try {
                const preTemplates = await Template.find().sort({ createdAt: -1 });
                const templates = await preTemplates.filter((t) => user.id === t.userId);
                return templates;
            } catch(err) {
                throw new Error(err);
            }
        },
        async getTemplate(_, { templateId }, context) {
            const user = checkAuth(context);

            try {
                const template = await Template.findById(templateId);
                if (template) {
                    return template;
                } else {
                    throw new Error('Template not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: { 
        async createTemplate(_, { templateInput: { 
            title, 
            input1Type, 
            input1Collection, 
            input2Type, 
            input2Collection, 
            input3Type, 
            input3Collection, 
            input4Type, 
            input4Collection,
            input5Type, 
            input5Collection,
            input6Type, 
            input6Collection,
            input7Type, 
            input7Collection,
            } }, context) {
            const user = checkAuth(context);

            if (title.trim() === '') {
                throw new Error('Title must not be empty');
            }

            if (input1Type.trim() === '') {
                throw new Error('At least one input type must be selected');
            }

            if (input1Collection.trim() === '') {
                throw new Error('At least one input collection must be selected');
            }

            const newTemplate = new Template({
                userId: user.id,
                createdAt: new Date().toISOString(),
                title, 
                input1Type, 
                input1Collection, 
                input2Type, 
                input2Collection, 
                input3Type, 
                input3Collection, 
                input4Type, 
                input4Collection,
                input5Type, 
                input5Collection,
                input6Type, 
                input6Collection,
                input7Type, 
                input7Collection
            });

            const template = await newTemplate.save();

            return template;
        },
        async deleteTemplate(_, { templateId }, context) {
            const user = checkAuth(context);

            try {
                const template = await Template.findById(templateId);

                if (template.userId === user.id) {
                    await template.delete();
                    return 'Template deleted';
                } else {
                    throw new Error('Authentification Error');
                }
                
            } catch (err) {
                throw new Error(err);
            }
        }
    }
};