/**
 * Created by hriya on 4/1/16.
 */
module.exports = function (mongoose) {
    "use strict";

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String],
        roles: [String]
    }, {collection: 'assignment.user'});
    return UserSchema;
};