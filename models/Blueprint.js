const { model, Schema } = require('mongoose');

const blueprintSchema = new Schema({
    access: {
        users: String,
        userId: String
    },
    createdAt: String,
    projectType: String,
    title: String,
    input1: {
        input: String,
        collection: String
    },
    input2: {
        input: String,
        collection: String
    },
    input3: {
        input: String,
        collection: String
    },
    input4: {
        input: String,
        collection: String
    },
    input5: {
        input: String,
        collection: String
    },
    input6: {
        input: String,
        collection: String
    },
    input7: {
        input: String,
        collection: String
    },
    tasks: [
        {
            name: String,
            blueprintId: String,
            createdAt: String,
            duedate: {
                days: String,
                from: String,
                beforeOrAfter: String
            }
        }
    ]
});

module.exports = model('Blueprint', blueprintSchema);