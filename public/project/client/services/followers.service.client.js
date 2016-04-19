/**
 * Created by hriya on 4/18/16.
 */
(function () {
    "use strict";
    angular
        .module("RecipeWorld")
        .factory("FollowerService", followerService);

    function followerService($http) {


        var api = {

            findAllFollowersForUser: findAllFollowersForUser,
            findUserByName: findUserByName,
            addFollower: addFollower,
            deleteFriendById: deleteFriendById
        };

        return api;

        function findAllFollowersForUser(userId) {
            return $http.get('/api/project/' + userId + '/following');
        }

        function findUserByName(name) {

            return $http.get('/api/project/follower/'+name);
        }

        function addFollower(user, id) {
            return $http.post('/api/project/user/' + id + '/follower', user);
        }

        function deleteFriendById(id) {
            return $http.delete('/api/project/user/following/' + id);
        }
    }

    })();