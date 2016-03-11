(function () {
    "use strict";
    angular
        .module("RecipeWorld")
        .factory("RecipeService", recipeService);

    function recipeService() {
        var recipe, user;
        var recipes =
            [
                {"_id": "000", "recipe": "Peanut Butter Cookies","recipeId":"Soft-and-Rich-Peanut-Butter-Cookies-1537708", "userId": 123},
                {"_id": "010", "recipe": "Cheese Pizza","recipeId":"Cheese-Pizza-My-Recipes", "userId": 123},
                {"_id": "020", "recipe": "Mashed Potatoes","recipeId":"The-Ultimate-Mashed-Potatoes-1511956", "userId": 234}
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
                    recipes.splice(recipe,1);
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