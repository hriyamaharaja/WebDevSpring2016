/**
 * Created by hriya on 3/15/16.
 */
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function (app, model) {
    "use strict";
    var auth = authorized;

    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user/:id', getUserById);
    app.all('/api/assignment/user', function (req, res, next) {
        if (req.query.username != null && req.query.password != null) {
            findUserByCredentials(req, res);
        } else if (req.query.username && !req.query.password) {
            findUserByUsername(req, res);
        }
        else {
            next();
        }
    });
    app.get('/api/assignment/user', auth,getAllUsers);

    app.put('/api/assignment/user/:userId',auth, updateUser);
    app.delete('/api/assignment/user/:id',auth, deleteUser);
    app.post('/api/login',passport.authenticate('local'), login);
    app.post('/api/logout',         logout);
    app.post('/api/register',       register);
    app.post('/api/user',     auth, createUser);
    app.get ('/api/loggedin',       loggedin);

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

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['user'];

        model
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        model.createUser(newUser).then(
                            function(user){
                                if(user){
                                    req.login(user, function(err) {
                                        if(err) {
                                            res.status(400).send(err);
                                        } else {
                                            res.json(user);
                                        }
                                    });
                                }
                            },
                            function(err){
                                res.status(400).send(err);
                            }
                        );
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }


    function createUser(req, res) {
        var newUser = req.body;
        delete newUser['_id'];
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


    function findUserByUsername(req, res) {

        var username = req.query.username;
        res.json(model.findUserByUsername(username));
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        model.findUserByCredentials(username, password).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
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
