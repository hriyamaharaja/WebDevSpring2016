(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($http) {


        var service = {
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername
        };

        return service;

        function findAllUsers() {
            return $http.get('/api/assignment/user');

        }

        function findUserByCredentials(username, password) {
            var data = {
                username: username,
                password: password
            };

            return $http.get('/api/assignment/user', {params: data});

        }

        function findUserByUsername(username) {
            var data = {
                username: username
            };

            return $http.get('/api/assignment/user', {params: data});
        }

        function createUser(user) {
            return $http.post('/api/assignment/user', user);

        }

        function deleteUserById(userId) {
            return $http.delete('/api/assignment/user/' + userId);
        }

        function updateUser(userId, user) {
            return $http.put('/api/assignment/user/' + userId, user);

        }


    }
})();