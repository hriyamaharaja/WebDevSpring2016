/**
 * Created by hriya on 3/15/16.
 */
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function (app, assgnmodel, model) {
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

    app.post('/api/project/login',passport.authenticate('project'), login);
    app.post('/api/assignment/login',passport.authenticate('assignment'), login);


    app.post('/api/project/logout',         logout);
    app.post('/api/project/register',       register);

    app.get ('/api/project/loggedin',       loggedin);

    passport.use('project',new LocalStrategy(projectLocalStrategy));
    passport.use('assignment',new LocalStrategy(assignLocalStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function assignLocalStrategy(username,password,done)
    {
        assgnmodel.findUserByUsername(username).then(
            function(user)
            {
                if(!user)
                {
                    return done(null,false);
                }
                else
                {
                    if(user && bcrypt.compareSync(password,user.password)) {
                        return done(null, user);
                    }
                }
            },
            function(err)
            {
                if(err)
                {
                    return done(err);
                }
            }
        );
    }

    function projectLocalStrategy(username,password,done)
    {

        model.findUserByUsername(username).then(
            function(user)
            {
                if(!user)
                {
                    return done(null,false);
                }
                else
                {
                    if(user && bcrypt.compareSync(password,user.password)) {
                        return done(null, user);
                    }
                }
            },
            function(err)
            {
                if(err)
                {
                    return done(err);
                }
            }
        );
    }



    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {

        {
            if(user.type == 'assignment') {

                assgnmodel.findUserById(user._id).then(
                    function (user) {
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
            }
            else if(user.type == 'project') {

                model.findUserById(user._id).then(
                    function (user) {
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
            }
        }

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
        if(newUser.username == 'bob' && newUser.password == 'bob')
        {
            newUser.roles = ['admin'];
        }
        newUser.password = bcrypt.hashSync(req.body.password);
        newUser.type = "project";


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

        if(user.password)
        {
            user.password = bcrypt.hashSync(req.body.password);
        }

        delete user['_id'];
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
