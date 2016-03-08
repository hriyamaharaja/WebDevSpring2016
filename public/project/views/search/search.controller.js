(function () {
    angular
        .module("RecipeWorld")
        .controller("SearchController", searchController);

    function searchController($scope, $location,$routeParams, YummlyService) {

        function search(recipe) {
            $location.url("/search/" + $scope.recipe);
            console.log(recipe);
            YummlyService.findRecipes(
                recipe,
                function (response) {

                    console.log(response);
                    $scope.data = response;
                    console.log($scope.data);
                });
        }

        $scope.search = search;
        $scope.recipe = $routeParams.recipe;


        if ($scope.recipe) {
            search($scope.recipe);
        }


    }
})();