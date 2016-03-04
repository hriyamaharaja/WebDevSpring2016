/**
 * Created by hriya on 3/4/16.
 */
(function(){
    angular
        .module("RecipeWorld")
        .controller("MainController", MainController);
    function MainController($scope,$location) {
        $scope.$location = $location;

    }
})();