/**
 * Created by hriya on 3/15/16.
 */
module.exports = function (app, model) {
    "use strict";
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
    app.get('/api/assignment/user', getAllUsers);

    app.put('/api/assignment/user/:userId', updateUser);
    app.delete('/api/assignment/user/:id', deleteUser);


    function createUser(req, res) {
        var user = req.body;
        model.createUser(user).then(
            function (doc) {

                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function getUserById(req, res) {
        var id = req.params.id;
        res.json(model.findUserById(id));
    }

    function getAllUsers(req, res) {
        model.findAllUsers().then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
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
        var id = req.params.id;
        var user = req.body;

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
        model.deleteUserById(id).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }
}
