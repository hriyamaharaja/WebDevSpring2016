/**
 * Created by hriya on 3/15/16.
 */
var q = require("q");

module.exports = function (db, mongoose) {

    var ProjectUserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('ProjectUser', ProjectUserSchema);

    var api = {
        findAllUsers: findAllUsers,
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername
    };

    return api;

    function findUserById(userId) {

        var deferred = q.defer();
        UserModel.findById({_id: userId}, function (err, doc) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve(doc);
        });

        return deferred.promise;
    }


    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username: username}, function (err, doc) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve(doc);
        });

        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();

        UserModel.findOne({username: username, password: password}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllUsers() {

        var deferred = q.defer();

        UserModel.find({}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();

        UserModel.create(user, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();

        UserModel.remove({_id: userId}, function (err, doc) {
            if (err)
                deferred.reject(err);
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();

        //return UserModel.update({_id: userId}, {$set: user});

        UserModel.findById(userId, function (err, userToUpdate) {
            if (err)
                deferred.reject(err);
            else {
                //$set
                userToUpdate.firstName = user.firstName;
                userToUpdate.lastName = user.lastName;
                userToUpdate.password = user.password;
                userToUpdate.username = user.username;
                userToUpdate.emails = user.emails;
                userToUpdate.roles = user.roles;
                userToUpdate.save(function (err, doc) {
                    if (err)
                        deferred.reject(err);
                    else {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }



};