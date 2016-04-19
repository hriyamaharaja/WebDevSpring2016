/**
 * Created by hriya on 4/17/16.
 */
/**
 * Created by hriya on 3/7/16.
 */
(function () {
    angular
        .module("RecipeWorld")
        .controller("UserDetailController", userDetailController);

    function userDetailController($scope, $location, $routeParams, $rootScope, UserRecipeService,UserService, ReviewService,FollowerService) {
        $scope.rootScope = $rootScope;
        $scope.friends = {};


        if($rootScope.user != null){
            FollowerService.findAllFollowersForUser($scope.rootScope.user._id).then(function(response){
                $scope.friends = response.data;
                var friends = response.data;

                for(var f in friends)
                {
                    if(friends[f].following_username == $scope.profileUsername)
                    {
                        $scope.following = true;
                        $scope.selectedUserIndex = f;
                    }
                }

            });
        }

        $scope.profileUsername = $routeParams.username;

        UserService.findUserByUsername($scope.profileUsername).then(function(response){
            $scope.profile = response.data;
            UserRecipeService.findAllRecipesForUser($scope.profile._id).then(function (response) {
                $scope.recipes = response.data;
                ReviewService.findAllReviewsForUser($scope.profile._id).then(
                    function (response) {
                        $scope.reviews = response.data;
                    }
                );
            });
        });

        $scope.$location = $location;
        $scope.user = $rootScope.user;





        $scope.removeFriend = function () {

            FollowerService.deleteFriendById($scope.profile._id).then(function(response) {
                FollowerService.findAllFollowersForUser($rootScope.user._id).then(function(response){

                    $scope.friends = response.data;
                    $scope.following= false;
                });
            });
        };



        $scope.follow = function () {
            FollowerService.addFollower($scope.profile,$scope.rootScope.user._id).then(function(response) {
                $scope.following= true;
            });
        };

    }
})();
