(function () {
    "use strict";
    angular
        .module("RecipeWorld")
        .controller("MyRecipesController", MyRecipesController);

    function MyRecipesController($rootScope, $scope, $location, UserRecipeService) {
        $scope.$location = $location;
        $scope.rootScope = $rootScope;
        $scope.recipes = {};

        $scope.orderFeature = "recipe";
        $scope.orderDescending = false;

        $scope.sortBy = function(feature){
            "use strict";
            $scope.orderFeature=feature ;
            $scope.orderDescending = !$scope.orderDescending;

        }

        if ($rootScope.user != null) {
            UserRecipeService.findAllRecipesForUser($scope.rootScope.user._id).then( function (response) {
                $scope.recipes = response.data;
            });
        }

        $scope.addRecipe = function () {

            var newRecipe = {

                recipe: $scope.recipeName,
                userId: $scope.rootScope.user._id
            }


            UserRecipeService.createRecipeForUser($scope.rootScope.user._id, newRecipe).then(
                function (response) {
                    $scope.recipeName = "";
                    UserRecipeService.findAllRecipesForUser($scope.rootScope.user._id).then( function (response) {
                        $scope.recipes = response.data;
                    });
                });

        };

        $scope.updateRecipe = function () {

            var newRecipe = {
                recipe: $scope.recipeName,
                userId: $scope.rootScope.user._id


            }


            UserRecipeService.updateRecipeById($scope.recipes[$scope.selectedRecipeIndex]._id, newRecipe).then( function (response) {
                $scope.recipeName = "";
                UserRecipeService.findAllRecipesForUser($scope.rootScope.user._id).then( function (response) {
                    $scope.recipes = response.data;
                });
            });
        };


        $scope.selectRecipe = function (index) {
            $scope.selectedRecipeIndex = index;
            $scope.recipeName = $scope.recipes[index].recipe;
        };

        $scope.deleteRecipe = function (index) {
            $scope.selectedRecipeIndex = index;

            UserRecipeService.deleteRecipeById($scope.recipes[index]._id).then( function (response) {
                UserRecipeService.findAllRecipesForUser($scope.rootScope.user._id).then( function (response) {
                    $scope.recipes = response.data;
                });
            });
        };

    }
})();