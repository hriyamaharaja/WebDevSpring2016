(function () {
    "use strict";
    angular
        .module("RecipeWorld")
        .controller("MyRecipesController", MyRecipesController);

    function MyRecipesController($rootScope, $scope, $location, RecipeService) {
        $scope.$location = $location;
        $scope.rootScope = $rootScope;
        $scope.recipes = {};

        if ($rootScope.user != null) {
            RecipeService.findAllRecipesForUser($scope.rootScope.user._id, function (response) {
                $scope.recipes = response;
            });
        }

        $scope.addRecipe = function () {

            var newRecipe = {

                _id: (new Date()).getTime(),
                recipe: $scope.recipeName,
                userId: $scope.rootScope.user._id
            }


            RecipeService.createRecipeForUser($scope.rootScope.user._id, newRecipe,
                function (response) {
                    $scope.recipeName = "";
                    console.log(response);
                    RecipeService.findAllRecipesForUser($scope.rootScope.user._id, function (response) {
                        $scope.recipes = response;
                    });
                });

        };

        $scope.updateRecipe = function () {

            var newRecipe = {

                _id: $scope.recipes[$scope.selectedRecipeIndex]._id,
                recipe: $scope.recipeName,
                userId: $scope.rootScope.user._id


            }


            RecipeService.updateRecipeById($scope.recipes[$scope.selectedRecipeIndex]._id, newRecipe, function (response) {
                $scope.recipeName = "";
                RecipeService.findAllRecipesForUser($scope.rootScope.user._id, function (response) {
                    $scope.recipes = response;
                });
            });
        };


        $scope.selectRecipe = function (index) {
            $scope.selectedRecipeIndex = index;
            $scope.recipeName = $scope.recipes[index].recipe;
        };

        $scope.deleteRecipe = function (index) {
            $scope.selectedRecipeIndex = index;

            RecipeService.deleteRecipeById($scope.recipes[index]._id, function (response) {
                RecipeService.findAllRecipesForUser($scope.rootScope.user._id, function (response) {
                    $scope.recipes = response;
                });
            });
        };

    }
})();