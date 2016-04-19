/**
 * Created by hriya on 4/18/16.
 */
(function () {
    "use strict";
    angular
        .module("RecipeWorld")
        .controller("SearchUserController", searchUserController);

    function searchUserController($rootScope,$scope, $location, FollowerService){


        $scope.user = $rootScope.user;
        $scope.users = {};


        $scope.searchUsers = function() {
            var username = $scope.username;

            FollowerService.findUserByName(username).then(function (response) {
                $scope.users = response.data;
            });
        };

        $scope.follow = function (index) {
            $scope.selectedUserIndex = index;

            FollowerService.addFollower($scope.users[index],$rootScope.user._id).then(function(response) {
                $location.path("/following");
            });
        };

    }

})();