/**
 * Created by hriya on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($rootScope, $routeParams, $scope, $location, FieldService) {
        $scope.$location = $location;
        $scope.userId = $rootScope.user._id;
        $scope.formId = $routeParams.formId;

        FieldService.getFieldsForForm($scope.formId).then(
            function(response){
                $scope.fields = response.data;
            }
        );
        console.log($scope.fields);

        $scope.addField = function (field) {

            FieldService.createFieldForForm($scope.formId, field).then(
                function (response) {
                   FieldService.getFieldsForForm($scope.formId).then(
                       function(response){
                           $scope.fields = response.data;
                       }
                   );
                }
            );

        };

        $scope.deleteField = function (field) {

            FieldService.deleteField(field._id).then(function (response) {

                FieldService.getFieldsForForm($scope.formId).then(
                    function(response){
                        $scope.fields = response.data;
                    }
                );

            });
        };

    }
})();
