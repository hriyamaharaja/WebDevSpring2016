/**
 * Created by hriya on 2/20/16.
 */
( function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $scope, $location, FormService) {
        $scope.$location = $location;
        $scope.rootScope = $rootScope;
        $scope.forms = {}

        if($rootScope.user != null){
         FormService.findAllFormsForUser($scope.rootScope.user._id,function(response){
            $scope.forms = response;
        });
        }

        $scope.addForm = function () {

            var newForm = {

                _id :  (new Date()).getTime(),
                recipe : $scope.formName,
                userId : $scope.rootScope.user._id
            }


            FormService.createFormForUser($scope.rootScope.user._id, newForm,
                function (response) {
                    $scope.formName = "";
                    console.log(response);
                    FormService.findAllFormsForUser($scope.rootScope.user._id,function(response){
                        $scope.forms = response;
                    });
                });

        };

        $scope.updateForm = function () {

            var newForm = {

                _id :  $scope.forms[$scope.selectedFormIndex]._id,
                recipe : $scope.formName,
                userId : $scope.rootScope.user._id


            }


            FormService.updateFormById($scope.forms[$scope.selectedFormIndex]._id,newForm,function(response){
                $scope.formName = "";
                FormService.findAllFormsForUser($scope.rootScope.user._id,function(response){
                    $scope.forms = response;
                });
            });
        };



        $scope.selectForm = function (index) {
            $scope.selectedFormIndex = index;
            $scope.formName = $scope.forms[index].recipe;
        };

        $scope.deleteForm = function (index) {
            $scope.selectedFormIndex = index;

            FormService.deleteFormById($scope.forms[index]._id, function (response) {
                FormService.findAllFormsForUser($scope.rootScope.user._id,function(response){
                    $scope.forms = response;
                });
            });
        };

    }
})();
