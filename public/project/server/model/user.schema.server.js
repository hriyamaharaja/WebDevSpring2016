/**
 * Created by hriya on 4/16/16.
 */
module.exports = function (mongoose) {
    "use strict";

    var ProjectUserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        roles: [String]
    }, {collection: 'project.user'});
    return ProjectUserSchema;
};