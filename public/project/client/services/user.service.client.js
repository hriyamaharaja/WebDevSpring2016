(function () {
    "use strict";
    angular
        .module("RecipeWorld")
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
            return $http.get('/api/project/user');
        }

        function findUserByCredentials(username, password) {
            var data = {
                username: username,
                password: password
            };

            return $http.get('/api/project/user', {params: data});
        }

        function findUserByUsername(username) {
            var data = {
                username: username
            };

            return $http.get('/api/project/user', {params: data});
        }

        function createUser(user) {
            return $http.post('/api/project/user', user);

        }

        function deleteUserById(userId) {
            return $http.delete('/api/project/user/' + userId);
        }

        function updateUser(userId, user) {
            return $http.put('/api/project/user/' + userId, user);

        }


    }
})();