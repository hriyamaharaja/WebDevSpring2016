/**
 * Created by hriya on 3/15/16.
 */
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function (app, model) {
    "use strict";
    var auth = authorized;


    app.get('/api/project/user/:id', getUserById);
    app.all('/api/project/user', function (req, res, next) {
        if (req.query.username != null && req.query.password != null) {
            findUserByCredentials(req, res);
        } else if (req.query.username && !req.query.password) {
            findUserByUsername(req, res);
        }
        else {
            next();
        }
    });

    app.put('/api/project/user/:userId',auth, updateUser);

    app.post('/api/project/login',passport.authenticate('local'), login);
    app.post('/api/project/logout',         logout);
    app.post('/api/project/register',       register);

    app.get ('/api/project/loggedin',       loggedin);

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



    function getUserById(req, res) {
        var id = req.params.id;
        res.json(model.findUserById(id));
    }


    function findUserByUsername(req, res) {

        var username = req.query.username;
        model.findUserByUsername(username).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
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
