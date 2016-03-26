(function () {
    angular
        .module("RecipeWorld")
        .controller("MainController", MainController);
    function MainController($scope, $location) {
        $scope.$location = $location;

    }
})();