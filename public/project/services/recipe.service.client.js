(function () {
    "use strict";
    angular
        .module("RecipeWorld")
        .factory("RecipeService", recipeService);

    function recipeService() {
        var recipe, user;
        var recipes =
            [
                {"_id": "000", "recipe": "Peanut Butter Cookies", "userId": 123},
                {"_id": "010", "recipe": "Cheese Pizza", "userId": 123},
                {"_id": "020", "recipe": "Mashed Potatoes", "userId": 234}
            ];

        function createrecipeForUser(userId, recipe, callback) {
            recipe.userId = userId;
            recipes.push(recipe);
            callback(recipes);
        }

        function findAllRecipesForUser(userId, callback) {
            var userRecipes = [];
            for (recipe in recipes) {
                if (recipes[recipe].userId === userId) {
                    userRecipes.push(recipes[recipe]);
                }
            }
            callback(userRecipes);
        }

        function deleteRecipeById(recipeId, callback) {
            for (recipe in recipes) {
                if (recipes[recipe]._id === recipeId) {
                    recipes.splice(recipe);
                    break;
                }
            }
            callback(recipes);
        }

        function updateRecipeById(recipeId, newRecipe, callback) {

            for (recipe in recipes) {
                if (recipes[recipe]._id === recipeId) {
                    recipes[recipe] = newRecipe;
                    break;
                }

            }
            callback(recipes);
        }


        var service = {
            createRecipeForUser: createrecipeForUser,
            findAllRecipesForUser: findAllRecipesForUser,
            deleteRecipeById: deleteRecipeById,
            updateRecipeById: updateRecipeById

        };

        return service;
    }
})();