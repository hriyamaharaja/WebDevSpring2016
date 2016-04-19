(function () {
    "use strict";
    angular
        .module("RecipeWorld")
        .controller("FollowerController", FollowerController);

    function FollowerController($rootScope, $scope, $location, FollowerService) {
        $scope.$location = $location;
        $scope.user = $rootScope.user;


        if($rootScope.user != null){
            FollowerService.findAllFollowersForUser($scope.user._id).then(function(response){
                $scope.friends = response.data;
            });
        }


        $scope.removeFriend = function (index) {
            $scope.selectedGameIndex = index;

            FollowerService.deleteFriendById($scope.friends[index].following).then(function(response) {
                FollowerService.findAllFollowersForUser($rootScope.user._id).then(function(response){
                    $scope.friends = response.data;
                });
            });
        };



        $scope.follow = function (index) {
            $scope.selectedUserIndex = index;

            FollowerService.addFollower($scope.users[index],$scope.user._id).then(function(response) {
                //UserService.findAllGamesForUser($rootScope.user._id).then(function(response){
                //  $scope.games = response.data;
                $location.path("/following");
            });
        };

    }
})();