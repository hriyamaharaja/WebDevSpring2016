(function(){
    angular
        .module("RecipeWorld")
        .controller("LoginController",LoginController);

    function LoginController($rootScope, $scope, $location, UserService) {
        "use strict";


        $scope.login = function(){

            var user ={
            username : $scope.username,
            password : $scope.password
        }

            UserService.login(user).then(function(response){

                if (response) {
                    $rootScope.user = response.data;
                    $location.path("/profile");
                }
            });
        };

    }

})();