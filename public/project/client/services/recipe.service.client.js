/**
 * Created by hriya on 3/7/16.
 */
(function () {
    angular
        .module("RecipeWorld")
        .factory("RecipeService", recipeService);

    function recipeService($http) {

        var api = {
            findRecipes: findRecipes,
            findRecipeByID: findRecipeByID
        };
        return api;

        function findRecipes(recipe, params) {

            var data = {
                ingredient: params.ingredients,
                diet: params.diet,
                cuisine: params.cuisine,
                recipe: recipe
            }
            return $http.get('/api/project/recipe/', {params: data});
        }

        function findRecipeByID(recipeID) {
            return $http.get('/api/project/recipe/' + recipeID);
        }
    }
})();
