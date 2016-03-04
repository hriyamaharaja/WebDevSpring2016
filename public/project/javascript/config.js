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
                    templateUrl: "views/users/login.view.html",


                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",


                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",


                })
                .when("/myrecipes", {
                    templateUrl: "views/recipes/myrecipes.view.html",


                })

        });
})();
