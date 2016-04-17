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
                    redirectTo: "/home"
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
                    controller: "ProfileController",
                    resolve: {
                        //loggedin: checkLoggedin
                    }


                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    resolve: {
                        //loggedin: checkAdmin
                    }


                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"


                })
                .when("/myrecipes", {
                    templateUrl: "views/recipes/my-recipes.view.html",
                    controller: "MyRecipesController",
                    resolve: {
                        //loggedin: checkLoggedin
                    }


                })
                .when("/addrecipes", {
                    templateUrl: "views/recipes/add-recipe.view.html",
                    resolve: {
                        //loggedin: checkLoggedin
                    }


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

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };
})();
