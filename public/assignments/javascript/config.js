/**
 * Created by hriya on 2/21/16.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html"
                })
                .when("/home", {
                    templateUrl: "views/home/home.view.html"

                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html"

                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html"

                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html"

                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    Controller : "RegisterController"

                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html"

                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();
