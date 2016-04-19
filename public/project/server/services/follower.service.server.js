/**
 * Created by hriya on 4/18/16.
 */
module.exports = function(app,model) {
    "use strict";

    app.get('/api/project/:id/following', getFollowersForUser);

    app.post('/api/project/user/:id/follower', addFollower);

    app.delete('/api/project/user/following/:id', deleteFollowersForUser);

    app.get('/api/project/follower', getFollowerByUsername);

    function getFollowersForUser(req, res) {
        var id = req.params.id;

        model.findFollowersOfUser(id)
            .then(
                function(users) {
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFollowerByUsername(req, res) {
        var name = req.query.name;

        model.findFollowersByName(name)
            .then(
                function(users) {
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function addFollower(req, res) {
        var id = req.params.id;
        var user = req.body;

        var following = {following:user._id, follower:id, following_username: user.username};

        model.addFollower(id,following)
            .then(
                function(users) {
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFollowersForUser(req, res) {
        var id = req.params.id;
        model.deleteFollowerById(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


}