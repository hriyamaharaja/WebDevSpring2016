(function () {
    angular
        .module("RecipeWorld")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {

        $scope.users = {}
        UserService.findAllUsers().then(function (response) {
            "use strict";
            $scope.users = response;
        });

        $scope.hide = true;
        $scope.dispalert = false;


        $scope.register = function () {
            if ($scope.password != $scope.verifyPassword)
                dispalert = true;


            $scope.dispalert = false;


            UserService.createUser($rootScope.user).then(
                function (response) {
                    UserService.findUserByCredentials($scope.username,$scope.password).then(
                        function(response){
                            "use strict";
                            $rootScope.user = response.data;
                        }
                    );

                });

            $location.path("/profile");
        };


    }


})();