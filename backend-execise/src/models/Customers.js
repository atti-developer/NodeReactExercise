
const mongoose = require('mongoose');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const adschema = new mongoose.Schema({
    terms: {
        type: String,
        unique: true,
        default: null
    },
    definitions: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updateAt: {
        type: Date,
        default: new Date()
    },
    status: {
        type: Boolean,
        default: true
    },


}, { collection: "glossary" });
adschema.plugin(aggregatePaginate);
module.exports = Customers = mongoose.model("glossary", adschema);