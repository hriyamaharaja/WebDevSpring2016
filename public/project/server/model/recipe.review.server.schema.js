/**
 * Created by hriya on 4/16/16.
 */
module.exports = function (mongoose) {
    "use strict";

    var reviewSchema = require("./review.schema.server.js")(mongoose);


    var RecipeReviewSchema = mongoose.Schema({
        recipeId: String,
        reviews : [reviewSchema]
    }, {collection: 'project.review'});
    return RecipeReviewSchema;
};