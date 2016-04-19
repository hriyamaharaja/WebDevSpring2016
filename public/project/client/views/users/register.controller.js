(function () {
    angular
        .module("RecipeWorld")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {



        $scope.hide = true;
        $scope.dispalert = false;

        $scope.user={};
        $scope.user.email = "";

        $scope.register = function (isValid) {

            if(isValid){



            $scope.user.email = $scope.email;


            UserService.createUser($scope.user).then(
                function (response) {
                    UserService.login({username:$scope.user.username,password:$scope.user.password}).then(
                        function(response){
                            $rootScope.user = response.data;
                        }
                    );

                });

            $location.path("/profile");
        }

        };


    }


})();