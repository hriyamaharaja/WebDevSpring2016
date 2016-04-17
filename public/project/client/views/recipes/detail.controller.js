/**
 * Created by hriya on 3/7/16.
 */
(function () {
    angular
        .module("RecipeWorld")
        .controller("DetailController", detailController);

    function detailController($scope, $routeParams, $rootScope,RecipeService, UserRecipeService, ReviewService) {
        $scope.rootScope = $rootScope;

        $scope.showReview = false;

        $scope.toggleReview = function(){
            "use strict";
            $scope.showReview = !$scope.showReview;
        }

        $scope.recipeID = $routeParams.recipeID;

        RecipeService.findRecipeByID(
            $scope.recipeID).then(
            function (response) {
                $scope.recipe = response.data;
            }
        );

        ReviewService.findAllReviewsForRecipe($scope.recipeID).then(
            function (response) {
                $scope.reviews = response.data;
            }
        );

        $scope.saveRecipe = function () {
            "use strict";
            var newRecipe =
            {
                recipe: $scope.recipe.name,
                recipeId : $scope.recipeID
            }

            var userId = $rootScope.user._id;

            UserRecipeService.createRecipeForUser(userId, newRecipe).then(function (response) {

            });

        };
    }
})();
