(function () {
    angular
        .module("RecipeWorld")
        .controller("SearchController", searchController);

    function searchController($scope, $location, $routeParams, RecipeService) {

        $scope.orderFeature = "recipeName";
        $scope.orderDescending = false;

        $scope.sortBy = function(feature){
            "use strict";
            $scope.orderFeature=feature ;
            $scope.orderDescending = !$scope.orderDescending;

        }

        function search(recipe) {


            $location.url("/search/" + $scope.recipe);
            var params = {
                ingredients: $scope.ingredient,
                diet: $scope.diet,
                cuisine: $scope.cuisine

            }

            RecipeService.findRecipes(
                recipe,
                params).then(
                function (response) {

                    console.log(response);
                    $scope.data = response.data;
                    if ($scope.data.totalMatchCount === 0) {
                        $scope.message = "Oops! No recipes found.";
                    }
                    console.log($scope.data);
                });
        }


        $scope.search = search;
        $scope.recipe = $routeParams.recipe;
        $scope.message = "";


        if ($scope.recipe) {
            search($scope.recipe);
        }
    }
})();