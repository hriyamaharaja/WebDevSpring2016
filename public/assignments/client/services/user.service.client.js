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
            findUserByUsername: findUserByUsername,
            login : login,
            register:register,
            logout : logout
        };

        return service;

        function findAllUsers() {
            return $http.get('/api/assignment/user');

        }

        function findUserByCredentials(user) {
            return $http.get('/api/assignment/login', user);

        }

        function logout() {
            return $http.post("/api/logout");
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function logout(user) {
            return $http.post("/api/logout", user);
        }

        function findUserByUsername(username) {
            var data = {
                username: username
            };

            return $http.get('/api/assignment/user', {params: data});
        }

        function createUser(user) {
            return $http.post('/api/user', user);

        }

        function deleteUserById(userId) {
            return $http.delete('/api/assignment/user/' + userId);
        }

        function updateUser(userId, user) {
            return $http.put('/api/assignment/user/' + userId, user);

        }


    }
})();