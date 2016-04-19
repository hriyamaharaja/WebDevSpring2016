/**
 * Created by hriya on 4/18/16.
 */
var q = require("q");

module.exports = function (db, mongoose) {

    var FollowerSchema = require("./follower.schema.server.js")(mongoose);
    var FollowerModel = mongoose.model('followers', FollowerSchema);

    var ProjectUserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('Project_User', ProjectUserSchema);

    var api = {
        findFollowersOfUser: findFollowersOfUser,
        findFollowersByName: findFollowersByName,
        addFollower: addFollower,
        deleteFollowerById: deleteFollowerById
    };

    return api;

    function findFollowersOfUser(userId) {
        var deferred = q.defer();

        FollowerModel.find({follower:userId},function(err,users)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

    function findFollowersByName(name) {
        var deferred = q.defer();



            UserModel.find({username:name},function(err,users)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else
                {
                    deferred.resolve(users);
                }
            });

            return deferred.promise;


    }

    function addFollower(following) {
        var deferred = q.defer();

        FollowerModel.create(following,function(err,users)
        {
            if(err)
            {
                deferred.reject(err);
            }
            else
            {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

    function deleteFollowerById(id) {
        var deferred = q.defer();

        FollowerModel.remove({following: id},function(err,doc)
        {
            if(err)
                deferred.reject(err);
            else
            {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

}