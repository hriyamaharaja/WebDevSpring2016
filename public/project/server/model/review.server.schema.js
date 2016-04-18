/**
 * Created by hriya on 4/16/16.
 */
module.exports = function (mongoose) {
    "use strict";


    var ReviewSchema = mongoose.Schema({
        recipe:String,
        recipeId: String,
        userId: String,
        username: String,
        text: String,
        rating: Number
    }, {collection: 'project.review'});
    return ReviewSchema;
};