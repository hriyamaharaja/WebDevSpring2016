
module.exports = function (mongoose) {
    var ProjectUserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        roles: [String]
    }, {collection: 'project.user'});
    return ProjectUserSchema;
};