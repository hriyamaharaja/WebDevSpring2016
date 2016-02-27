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

        $scope.forms = FormService.findAllFormsForUser($scope.rootScope.user._id);

        $scope.addForm = function () {

            var newForm = {

                _id :  (new Date()).getTime(),
                title : $scope.formName,
                userId : $scope.rootScope.user._id
            }


            FormService.createFormForUser($scope.rootScope.user._id, newForm,
                function (response) {
                    $scope.formName = "";
                    console.log(response);
                    $scope.forms = FormService.findAllFormsForUser($scope.rootScope.user._id);
                });

        };

        $scope.updateForm = function () {

            var newForm = {

                _id :  $scope.forms[$scope.selectedFormIndex]._id,
                title : $scope.formName,
                userId : $scope.rootScope.user._id


            }


            FormService.updateFormById($scope.forms[$scope.selectedFormIndex]._id,newForm,function(response){
                $scope.formName = "";
                $scope.forms = FormService.findAllFormsForUser($scope.rootScope.user._id);
            });
        };



        $scope.selectForm = function (index) {
            $scope.selectedFormIndex = index;
            $scope.formName = $scope.forms[index].title;
        };

        $scope.deleteForm = function (index) {
            $scope.selectedFormIndex = index;

            FormService.deleteFormById($scope.forms[index]._id, function (response) {
                $scope.forms = FormService.findAllFormsForUser($scope.rootScope.user._id);
            });
        };

    }
})();
