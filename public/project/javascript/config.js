/**
 * Created by hriya on 2/21/16.
 */
(function () {
    "use strict";
    angular
        .module("RecipeWorld")
        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html"
                })
                .when("/home", {
                    templateUrl: "views/home/home.view.html"


                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"


                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"


                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html"


                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"


                })
                .when("/myrecipes", {
                    templateUrl: "views/recipes/my-recipes.view.html",
                    controller: "MyRecipesController"


                })
                .when("/savedrecipes", {
                    templateUrl: "views/recipes/saved-recipes.view.html",
                    controller: "SavedRecipesController"


                })
                .when("/addrecipes", {
                    templateUrl: "views/recipes/add-recipe.view.html"


                })
                .when("/recipe/:recipeID", {
                    templateUrl: "views/recipes/recipe-details.view.html",
                    controller: "DetailController"


                })
                .when("/search", {
                    templateUrl: "views/search/search.view.html",
                    controller: "SearchController"
                })
                .when("/search/:recipe", {
                    templateUrl: "views/search/search.view.html",
                    controller: "SearchController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();
