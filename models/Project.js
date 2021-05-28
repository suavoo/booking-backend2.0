const { model, Schema } = require('mongoose');

const projectSchema = new Schema({
    userId: String,
    createdAt: String,
    artist: String,
    venue: String,
    date: String,
    time: String,
    projectType: String,
    result: String,
    note1: String,
    note2: String,
    gage: String,
    tasks: [
        {
            name: String,
            projectId: String,
            createdAt: String,
            artist: String,
            venue: String,
            date: String,
            time: String,
            projectType: String,
            done: Boolean,
            duedate: String,
            note: String
        }
    ]
});

module.exports = model('Project', projectSchema);