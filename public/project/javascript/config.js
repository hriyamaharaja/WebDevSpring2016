/**
 * Created by hriya on 2/21/16.
 */
(function () {
    "use strict";
    angular
        .module("RecipeWorld")
        .config(function ($routeProvider) {
            $routeProvider
                .when("/login", {
                    templateUrl: "views/users/login.view.html"


                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html"


                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html"


                })
                .when("/myrecipes", {
                    templateUrl: "views/recipes/my-recipes.view.html"


                })
                .when("/savedrecipes", {
                    templateUrl: "views/recipes/saved-recipes.view.html"


                })
                .when("/addrecipes", {
                    templateUrl: "views/recipes/add-recipe.view.html"


                })
                .when("/recipe-details", {
                    templateUrl: "views/recipes/recipe-details.view.html"


                })
                .when("/search", {
                    templateUrl: "views/recipes/search.view.html"


                })
                .when("/home", {
                    templateUrl: "views/home/home.view.html"


                })

        });
})();
