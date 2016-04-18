(function () {
    "use strict";
    angular
        .module("RecipeWorld")
        .factory("UserService", userService);

    function userService($http) {


        var api = {

            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername
        };

        return api;


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
            return $http.post('/api/project/register', user);

        }

        function updateUser(userId, user) {
            return $http.put('/api/project/user/' + userId, user);

        }


    }
})();