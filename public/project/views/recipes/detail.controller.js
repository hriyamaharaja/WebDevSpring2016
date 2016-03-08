/**
 * Created by hriya on 3/7/16.
 */
(function(){
    angular
        .module("RecipeWorld")
        .controller("DetailController", detailController);

    function detailController($scope, $routeParams, YummlyService) {
        $scope.recipeID = $routeParams.recipeID;

        YummlyService.findRecipeByID(
            $scope.recipeID,
            function(response) {
                $scope.recipe = response;
            }
        )
    }
})();