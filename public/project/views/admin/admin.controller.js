(function () {
    "use strict";
    angular
        .module("RecipeWorld")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, $scope, $location, UserService) {
        $scope.$location = $location;
        $scope.rootScope = $rootScope;
        $scope.users = {};

        if ($rootScope.user.roles.indexOf('admin') >= 0) {
            UserService.findAllUsers( function (response) {
                $scope.users = response;
            });
        }

        $scope.addUser = function () {

            var newUser = {

                _id: (new Date()).getTime(),
                firstName: $scope.firstname,
                lastName: $scope.lastname,
                username:$scope.username,
                password:$scope.password,
                roles:$scope.roles
            }


            UserService.createUser(newUser,
                function (response) {


                    UserService.findAllUsers( function (response) {
                        $scope.users = response;
                    });
                });

        };

        $scope.updateUser = function () {

            var newUser = {

                _id: $scope.users[$scope.selectedUserIndex]._id,
                firstName: $scope.firstname,
                lastName: $scope.lastname,
                username:$scope.username,
                password:$scope.password,
                roles:$scope.roles


            }


            UserService.updateUser($scope.users[$scope.selectedUserIndex]._id, newUser, function (response) {

                UserService.findAllUsers(function (response) {
                    $scope.users = response;
                });
            });
        };


        $scope.selectUser = function (index) {
            $scope.selectedUserIndex = index;
            $scope.firstname = $scope.users[index].firstName;
            $scope.lastname = $scope.users[index].lastName;
            $scope.password = $scope.users[index].password;
            $scope.username = $scope.users[index].username;
            $scope.roles = $scope.users[index].roles;
        };

        $scope.deleteUser = function (index) {
            $scope.selectedUserIndex = index;

            UserService.deleteUserById($scope.users[index]._id, function (response) {

                    $scope.users = response;

            });
        };

    }
})();