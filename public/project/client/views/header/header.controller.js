(function () {
    angular
        .module("RecipeWorld")
        .controller("HeaderController", HeaderController);
    function HeaderController($scope, $rootScope, $location, UserService) {
        $scope.location = $location;
        $scope.rootScope = $rootScope;


        $scope.logout = function () {
            UserService.logout($scope.rootScope.user).then(function (response) {
                if (response) {
                    $rootScope.user = null;
                    $location.path("/home");
                }
            });
        };

    }
})();