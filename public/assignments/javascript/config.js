/**
 * Created by hriya on 2/21/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl:"index.html",
                })
                .when("/home", {
                    templateUrl: "views/home/home.view.html",

                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",

                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",

                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",

                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",

                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",

                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();
