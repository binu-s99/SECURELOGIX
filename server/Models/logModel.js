const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    logId: {
        type: String,
        required: [true, 'ID is required!']
    },
    source: {
        type: String,
        required: [true, 'Source is required!']
    },
    message: {
        type: String,
        required: [true, 'Message is required!']
    },
    date: {
        type: String,
        required: [true, 'Date is required']
    },
    incidentID:{
        type: String,
        required: [true, 'Incident id is required']
    },
    logType: {
        type: String,
        required: [true, 'Log type is required']
    }
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
