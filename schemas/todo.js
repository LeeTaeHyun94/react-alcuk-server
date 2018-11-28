const mongoose = require('mongoose');

// const { Schema } = mongoose;
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
        // required: true
    },
    description: {
        type: String,
        require: true
        // required: true
    },
    deadline: {
        type: Date,
        require: true
        // required: true
    },
    priority: {
        type: Number,
        require: true
        // required: true
    }
});

module.exports = mongoose.model('Todo', todoSchema);
