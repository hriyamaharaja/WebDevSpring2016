(function () {
    angular
        .module("RecipeWorld")
        .controller("LoginController",LoginController);

    function LoginController($rootScope, $scope, $location, UserService, $http) {
        "use strict";


        $scope.login = function () {

            var username = $scope.username;
            var password = $scope.password;

            UserService.findUserByCredentials(username, password, function (response) {

                if (response) {
                    $rootScope.user = response;
                    $location.path("/profile");
                }
            });


        };

    }

})();