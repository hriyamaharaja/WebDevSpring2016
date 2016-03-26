/**
 * Created by hriya on 3/7/16.
 */
(function(){
    angular
        .module("RecipeWorld")
        .controller("DetailController", detailController);

    function detailController($scope, $routeParams,$rootScope, RecipeService) {
        $scope.rootScope = $rootScope;

        $scope.recipeID = $routeParams.recipeID;

        RecipeService.findRecipeByID(
            $scope.recipeID).then(
            function(response) {
                $scope.recipe = response.data;
            }
        )
    }
})();
