/**
 * Created by hriya on 3/3/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService) {
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