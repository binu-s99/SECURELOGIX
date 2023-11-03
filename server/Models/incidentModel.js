const mongoose = require('mongoose');
const User = require('./userModel');
const Schema = mongoose.Schema;

const incidentSchema = new Schema({
    incidentId: {
        type: String,
        required: [true, 'ID is required!']
    },
    title: {
        type: String,
        required: [true, 'Title is required!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!']
    },
    date: {
        type: String,
        required: [true, 'Date is required'],
    },
    severity: {
        type: String,
        required: [true, 'Severity is required']
    },
    type: {
        type: String,
        required: [true, 'Type is required']
    },
    status: {
        type: Boolean,
        default: false,
        required: [true, 'Status is required']
    }
});

const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;
