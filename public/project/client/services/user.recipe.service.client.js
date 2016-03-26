(function () {
    "use strict";
    angular
        .module("RecipeWorld")
        .factory("UserRecipeService", userrecipeService);

    function userrecipeService($http) {

        var service = {
            createRecipeForUser: createrecipeForUser,
            findAllRecipesForUser: findAllRecipesForUser,
            deleteRecipeById: deleteRecipeById,
            updateRecipeById: updateRecipeById
        };
        return service;

        function createrecipeForUser(userId, recipe) {
            return $http.post('/api/project/user/' + userId + '/recipe/', recipe);
        }

        function findAllRecipesForUser(userId) {
            return $http.get('/api/project/user/' + userId + '/recipe/');
        }

        function deleteRecipeById(recipeId) {
            return $http.delete('/api/project/recipe/' + recipeId);
        }

        function updateRecipeById(recipeId, newRecipe) {
            return $http.put('/api/project/recipe/' + recipeId, newRecipe);
        }
    }
})();