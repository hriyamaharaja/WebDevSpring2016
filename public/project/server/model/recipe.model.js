
var q = require("q");

module.exports = function (db,mongoose) {

    var RecipeSchema = require("./recipe.schema.server.js")(mongoose);
    var RecipeModel = mongoose.model('Recipe', RecipeSchema);


    var api = {
        createRecipeForUser: createrecipeForUser,
        findAllRecipesForUser: findAllRecipesForUser,
        deleteRecipeById: deleteRecipeById,
        updateRecipeById: updateRecipeById

    };

    return api;

    function createrecipeForUser(userId, recipe) {
        var deferred = q.defer();


        recipe.userId = userId;

        RecipeModel.create(recipe, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllRecipesForUser(userId) {
        var deferred = q.defer();

        RecipeModel.find({userId: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }

    function deleteRecipeById(recipeId) {

        var deferred = q.defer();

        RecipeModel.remove({_id: recipeId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateRecipeById(recipeId, newRecipe) {
        var deferred = q.defer();

         RecipeModel.update({_id: recipeId}, {$set: newRecipe}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
}