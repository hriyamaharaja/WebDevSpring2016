(function () {
    angular
        .module("RecipeWorld")
        .controller("SearchController", searchController);

    function searchController($scope, $location,$routeParams,YummlyService) {

        function search(recipe) {


            $location.url("/search/" + $scope.recipe);
            var params = {
                ingredients : $scope.ingredient,
                diet: $scope.diet,
                cuisine : $scope.cuisine

            }

            YummlyService.findRecipes(
                recipe,
                params,
                function (response) {

                    console.log(response);
                    $scope.data = response;
                    if($scope.data.totalMatchCount===0)
                    {
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