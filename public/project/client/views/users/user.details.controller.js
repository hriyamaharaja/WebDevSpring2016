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

    function userDetailController($scope, $routeParams, $rootScope, UserRecipeService,UserService, ReviewService) {
        $scope.rootScope = $rootScope;



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





        $scope.follow = function () {


        };
    }
})();
