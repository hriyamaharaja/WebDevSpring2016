/**
 * Created by hriya on 2/20/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);
    function HeaderController($scope,$rootScope, $location) {
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