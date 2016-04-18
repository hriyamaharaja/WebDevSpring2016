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
            $scope.showReview = !$scope.showReview;
        }

        $scope.saved = false;

        UserRecipeService.findAllRecipesForUser($rootScope.user._id).then(function(response){
            var userRecipes = response.data;

            for(var rec in userRecipes)
            {
                if(userRecipes[rec].recipeId == $scope.recipeID)
                {
                    $scope.saved = true;
                }
            }
        });

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

                $scope.saved = true;
            });

        };

        $scope.addReview = function () {
            "use strict";
            var newReview =
            {
                recipeId: $scope.recipeID,
                userId: $rootScope.user._id,
                username: $rootScope.user.username,
                text: $scope.review.body,
                rating: $scope.review.stars
            }

            var userId = $rootScope.user._id;

            ReviewService.createReview(newReview).then(function (response) {
                $scope.reviews = response.data;
            });

        };
    }
})();
