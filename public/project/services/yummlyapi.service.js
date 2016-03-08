/**
 * Created by hriya on 3/7/16.
 */
(function () {
    angular
        .module("RecipeWorld")
        .factory("YummlyService", yummlyService);

    function yummlyService($http) {

        var api = {
            findRecipes: findRecipes,
            findRecipeByID: findRecipeByID
        };
        return api;

        var apiID = "89be9cee";
        var apiKey = "2c618bbaa7d11fd628e3583700f68c6b";

        function findRecipes(recipe,params, callback) {

            var ingredient = params.ingredients;
            var diet = params.diet;
            var cuisine = params.cuisine;


            $http(
                {
                    method: "GET",
                    url: "http://api.yummly.com/v1/api/recipes",
                    params: {
                        "_app_id": "89be9cee",
                        "_app_key": "2c618bbaa7d11fd628e3583700f68c6b",
                        "allowedIngredient[]" : ingredient,
                        "allowedDiet[]":diet,
                        "allowedCuisine[]" : cuisine,
                        "q": recipe

                    }
                }).success(callback);

            /*
            $http.jsonp('http://api.yummly.com/v1/api/recipes', {
                params: {
                    app_id: "89be9cee",
                    app_key: "2c618bbaa7d11fd628e3583700f68c6b",
                    requirePictures: true,
                    q: recipe
                }

            }).success(callback);
*/

        }

        function findRecipeByID(recipeID, callback) {

            $http(
                {
                    method: "GET",
                    url: "http://api.yummly.com/v1/api/recipe/" + recipeID,
                    params: {
                        "_app_id": "89be9cee",
                        "_app_key": "2c618bbaa7d11fd628e3583700f68c6b"

                    }
                }).success(callback);
        }

    }
})();
