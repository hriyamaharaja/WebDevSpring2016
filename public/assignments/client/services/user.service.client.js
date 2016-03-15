(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService() {


        var service = {
            findAllUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return service;

        function findAllUsers() {
            return $http.get('');

        }

        function findUserByCredentials(username, password) {
            var data = {
                username: username,
                password: password
            };

            return $http.get('', data);

        }

        function createUser(user) {
            return $http.post('', user);

        }

        function deleteUserById(userId) {
            return $http.delete('');
        }

        function updateUser(userId, user) {
            return $http.put('', user);

        }


    }
})();