/**
 * Created by hriya on 4/16/16.
 */
module.exports = function (mongoose) {
    "use strict";


    var ReviewSchema = mongoose.Schema({
        recipeId: String,
        userId: String,
        text: String
    }, {collection: 'project.review'});
    return ReviewSchema;
};