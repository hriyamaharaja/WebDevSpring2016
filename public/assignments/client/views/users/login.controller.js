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

            $scope.user = {username:$scope.username, password:$scope.password};

            UserService.login($scope.user).then(function(response){

                if (response) {
                    $rootScope.user = response.data;
                    $location.path("/profile");
                }
            });
        };

    }

})();

