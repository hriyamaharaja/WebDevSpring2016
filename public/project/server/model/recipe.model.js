/**
 * Created by hriya on 3/25/16.
 */
/**
 * Created by hriya on 3/19/16.
 */


var recipes = require("./recipe.mock.json");
module.exports = function () {

    var uuid = require('node-uuid');
    var api = {
        createRecipeForUser: createrecipeForUser,
        findAllRecipesForUser: findAllRecipesForUser,
        deleteRecipeById: deleteRecipeById,
        updateRecipeById: updateRecipeById

    };

    return api;

    function createrecipeForUser(userId, recipe) {
        recipe._id = uuid.v4();
        recipe.userId = userId;
        recipes.push(recipe);
        return recipes;
    }

    function findAllRecipesForUser(userId) {
        var userRecipes = [];
        for (var recipe in recipes) {
            if (recipes[recipe].userId == userId) {
                userRecipes.push(recipes[recipe]);
            }
        }
        return userRecipes;
    }

    function deleteRecipeById(recipeId) {
        for (var recipe in recipes) {
            if (recipes[recipe]._id === recipeId) {
                recipes.splice(recipe, 1);
                break;
            }
        }
        return recipes;
    }

    function updateRecipeById(recipeId, newRecipe) {

        for (var recipe in recipes) {
            if (recipes[recipe]._id === recipeId) {
                recipes[recipe] = newRecipe;
                break;
            }

        }
        return recipes;
    }
}