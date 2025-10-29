
const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
    subject: String,
    year: String,
    filePath: String,
    uploadedAt: {type:Date, default:Date.now}
});

module.exports = mongoose.model('Paper', paperSchema);