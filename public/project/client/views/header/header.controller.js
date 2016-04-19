(function () {
    angular
        .module("RecipeWorld")
        .controller("HeaderController", HeaderController);
    function HeaderController($scope, $rootScope, $location) {
        $scope.location = $location;
        $scope.rootScope = $rootScope;


        $scope.logout = function () {
            UserService.login(user).then(function (response) {

                if (response) {
                    $rootScope.user = null;
                    $location.path("/home");
                }
            });
        };

    }
})();