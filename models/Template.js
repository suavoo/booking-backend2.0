const { model, Schema } = require('mongoose');

const templateSchema = new Schema({
    userId: String,
    createdAt: String,
    title: String,
    input1Type: String,
    input1Collection: String,
    input2Type: String,
    input2Collection: String,
    input3Type: String,
    input3Collection: String,
    input4Type: String,
    input4Collection: String,
    input5Type: String,
    input5Collection: String,
    input6Type: String,
    input6Collection: String,
    input7Type: String,
    input7Collection: String,
    tasks: [
        {
            templateId: String,
            name: String,
            createdAt: String,
            days: String,
            from: String,
            beforeOrAfter: String
        }
    ]
});

module.exports = model('Template', templateSchema);