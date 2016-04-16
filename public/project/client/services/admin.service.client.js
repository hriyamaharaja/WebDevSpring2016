/**
 * Created by hriya on 4/16/16.
 */
(function () {
    "use strict";
    angular
        .module("RecipeWorld")
        .factory("AdminService", adminService);

    function adminService($http) {


        var api = {
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser

        };

        return api;

        function findAllUsers() {
            return $http.get('/api/project/admin/user');
        }


        function createUser(user) {
            return $http.post('/api/project/admin/user', user);

        }

        function deleteUserById(userId) {
            return $http.delete('/api/project/admin/user/' + userId);
        }

        function updateUser(userId, user) {
            return $http.put('/api/project/admin/user/' + userId, user);

        }


    }
})();
