/**
 * Created by hriya on 2/21/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);
    function MainController($scope,$rootScope, $location) {
        $scope.$location = $location;

    }
})();