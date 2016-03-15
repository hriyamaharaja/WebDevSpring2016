/**
 * Created by hriya on 2/20/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);
    function SidebarController($scope,$rootScope,$location)  {
    $scope.location = $location;
        $scope.rootScope = $rootScope;
    }
})();