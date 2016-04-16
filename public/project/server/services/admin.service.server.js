var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function (app, model) {
    "use strict";
    var auth = authorized;


    app.get('/api/project/admin/user/:id',auth, getUserById);
    app.get('/api/project/admin/user', auth,getAllUsers);
    app.put('/api/project/admin/user/:userId',auth, updateUser);
    app.delete('/api/project/admin/user/',auth, deleteUser);
    app.post('/api/project/admin/user',     auth, createUser);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {
        model
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
        delete newUser['_id'];
        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {

            newUser.roles = ["user"];
        }

        model.createUser(newUser).then(
            function (doc) {

                res.json(doc);
            },
            function (err) {
                console.log(err);
                res.status(400).send(err);
            }
        );
    }

    function getUserById(req, res) {
        var id = req.params.id;
        res.json(model.findUserById(id));
    }

    function getAllUsers(req, res) {
        if(isAdmin(req.user)) {

            model.findAllUsers().then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        } else {
            res.status(403);
        }
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var user = req.body;
        if(!isAdmin(req.user)) {
            delete user.roles;
        }
        if(typeof user.roles == "string") {
            user.roles = user.roles.split(",");
        }

        model.updateUser(id, user).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        //if same user as logged in do not delete
        if(isAdmin(req.user)) {

            model.deleteUserById(id).then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        } else {
            res.status(403);
        }
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > -1) {
            return true
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };
}
