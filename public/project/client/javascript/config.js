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
                    templateUrl: "views/home/home.view.html",
                    resolve: {
                        loggedin: checkCurrentUser
                    }


                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"


                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    resolve: {
                        loggedin: checkLoggedin
                    }


                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    resolve: {
                        loggedin: checkAdmin
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
                        loggedin: checkLoggedin
                    }


                })
                .when("/myreviews", {
                    templateUrl: "views/recipes/my-reviews.view.html",
                    controller: "MyReviewsController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/following", {
                    templateUrl: "views/users/following.view.html",
                    controller: "FollowerController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })

                .when("/recipe/:recipeID", {
                    templateUrl: "views/recipes/recipe-details.view.html",
                    controller: "DetailController",
                    resolve: {
                        loggedin: checkCurrentUser
                    }


                })
                .when("/follow/:username", {
                    templateUrl: "views/users/user-details.view.html",
                    controller: "UserDetailController",
                    resolve: {
                        loggedin: checkLoggedin
                    }


                })
                .when("/searchUsers", {
                    templateUrl: "views/users/searchUsers.view.html",
                    controller: "SearchUserController",
                    resolve: {
                        loggedin: checkLoggedin
                    }


                })
                .when("/follow/review/:username", {
                    templateUrl: "views/users/user-reviews.view.html",
                    controller: "UserDetailController",
                    resolve: {
                        loggedin: checkLoggedin
                    }


                })
                .when("/search", {
                    templateUrl: "views/search/search.view.html",
                    controller: "SearchController",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/search/:recipe", {
                    templateUrl: "views/search/search.view.html",
                    controller: "SearchController",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
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
                $rootScope.user = user;
                deferred.resolve();
            }
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
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
                $rootScope.user = user;
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
                $rootScope.user = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };
})();
