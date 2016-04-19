(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {



        $scope.hide = true;
        $scope.dispalert = false;


        $scope.register = function () {
            if ($scope.password != $scope.verifyPassword)
                dispalert = true;


            $scope.dispalert = false;

            var newuser={
                username : $scope.username,
                password : $scope.password,
                emails : $scope.email
            }


            UserService.register(newuser).then(
                function (response) {
                    UserService.login({username:$scope.user.username,password:$scope.user.password}).then(function (response) {
                        $rootScope.user = response.data;
                        $location.path("/profile");

                    })
                });


        };


    }


})();