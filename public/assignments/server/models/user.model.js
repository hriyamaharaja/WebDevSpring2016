/**
 * Created by hriya on 3/15/16.
 */
var users = require("./user.mock.json");

module.exports = function () {
    "use strict";

    var api = {
        findAllUsers: findAllUsers,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };

    return api;

    function findAllUsers() {
        return users;
    }

    function findUserByCredentials(username, password) {
        for (var user in users) {

            if (users[user].username === username && users[user].password === password) {
                return users[user];
            }
        }
    }

    function createUser(user) {
        users.push(user);

        return user;
    }

    function deleteUserById(userId) {

        for (var user in users) {
            if (users[user]._id == userId) {
                users.splice(user, 1);
            }
        }
        return users;
    }

    function updateUser(userId, user) {
        for (var u in users) {
            if (users[u]._id === userId) {
                users[u] = user;
                break;
            }

        }
        return user;
    }
}