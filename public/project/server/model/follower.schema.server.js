/**
 * Created by jtakwani on 4/16/16.
 */

module.exports = function(mongoose) {
// use mongoose to declare a user schema
    var FollowerSchema = mongoose.Schema({
        following: String,
        follower: String,
        following_firstname: String,
        following_lastname: String
    }, {collection: 'project.followers'});
    return FollowerSchema;
};