/**
 * Created by hriya on 2/20/16.
 */
"use strict";

(function()
{
    angular
        .module("RecipeWorld")
        .controller("AdminController", AdminController);

    function AdminController($scope, AdminService)
    {
        $scope.remove = remove;
        $scope.update = update;
        $scope.add    = add;
        $scope.select = select;
        $scope.reverse = false;
        $scope.predicate = 'username';
        $scope.selectedFormIndex = null;
        $scope.disable = true;

        function init() {
            UseAdminServicerService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function remove(user)
        {
            AdminService
                .deleteUserById(user._id)
                .then(init());
        }

        function update(user)
        {
            AdminService
                .updateUser(user._id, user)
                .then(init());
        }

        function add(user)
        {
            AdminService
                .createUser(user)
                .then(init());
        }

        function select(user)
        {
            $scope.user = angular.copy(user);
        }

        function handleSuccess(response) {
            $scope.users = response.data;
        }

        function handleError(error) {
            $scope.error = error;
        }

        $scope.sort = function(predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };
    }
})();