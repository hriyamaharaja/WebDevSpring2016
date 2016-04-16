/**
 * Created by hriya on 4/16/16.
 */
module.exports = function (mongoose) {
    "use strict";

    var RecipeSchema = mongoose.Schema({
        recipe: String,
        recipeId: String,
        userId: String
        }, {collection: 'project.recipe'});
    return RecipeSchema;
};