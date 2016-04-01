/**
 * Created by hriya on 4/1/16.
 */
module.exports = function (mongoose) {
    var fieldSchema = require("./field.schema.server.js")(mongoose);

    var form = mongoose.Schema({
        userId: String,
        title: String,
        fields: [fieldSchema],
        created: Date,
        updated: Date

    }, {collection: 'assignment.form'});

    return form;
};