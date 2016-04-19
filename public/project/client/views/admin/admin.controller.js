/**
 * Created by hriya on 2/20/16.
 */
"use strict";

(function () {
    angular
        .module("RecipeWorld")
        .controller("AdminController", AdminController);

    function AdminController($scope, AdminService, ReviewService, FollowerService, RecipeService) {
        $scope.remove = remove;
        $scope.update = update;
        $scope.add = add;
        $scope.select = select;
        $scope.reverse = false;
        $scope.predicate = 'username';
        $scope.selectedFormIndex = null;
        $scope.disable = true;

        function init() {
            AdminService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }

        init();

        function remove(index) {
            var userId = $scope.users[index]._id;
            AdminService
                .deleteUserById(userId)
                .then(function (reponse) {

                    FollowerService.deleteFriendById(userId)
                        .then(init());
                });


        }

        function update(user) {
            AdminService
                .updateUser($scope.selectedUserId, user)
                .then(init());
        }

        function add(user) {
            AdminService
                .createUser(user)
                .then(init());
        }

        function select(index) {
            $scope.selectedUserId = $scope.users[index]._id;
            $scope.user = angular.copy($scope.users[index]);
        }

        function handleSuccess(response) {
            $scope.users = response.data;
        }

        function handleError(error) {
            $scope.error = error;
        }

        $scope.sort = function (predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };
    }
})();