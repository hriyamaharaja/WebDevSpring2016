/**
 * Created by hriya on 2/20/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($rootScope, $scope, $location, UserService) {
        "use strict";


        $scope.login = function(){

            var username = $scope.username;
            var password = $scope.password;

            UserService.findUserByCredentials(username,password).then(function(response){

                if (response) {
                    console.log(response);
                    $rootScope.user = response.data;
                    console.log($rootScope.user);
                    $location.path("/profile");
                }
            });
        };

    }

})();

