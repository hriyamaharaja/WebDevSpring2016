(function () {
    "use strict";
    angular
        .module("RecipeWorld")
        .controller("FollowerController", FollowerController);

    function FollowerController($rootScope, $scope, $location, FollowerService) {
        $scope.$location = $location;
        $scope.user = $rootScope.user;


        $scope.orderFeature = "following_username";
        $scope.orderDescending = false;

        $scope.sortBy = function(feature){
            "use strict";
            $scope.orderFeature=feature ;
            $scope.orderDescending = !$scope.orderDescending;

        }

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
                 $location.path("/following");
            });
        };

    }
})();