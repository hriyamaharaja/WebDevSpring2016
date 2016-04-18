module.exports = function(app,model) {
    "use strict";


    app.get('/api/project/:userId/review', findAllReviewsForUser);
    app.get('/api/project/review/:recipeId', findAllReviewsForRecipe);
    app.delete('/api/project/review/:reviewId', deleteReviewById);
    app.post('/api/project/review', createReview);
    app.put('/api/project/review/:reviewId', updateReview);


    function findAllReviewsForUser(req,res){
        var userId = req.params.userId;
        model.findAllReviewsForUser(userId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function findAllReviewsForRecipe(req,res){
        var recipeId = req.params.recipeId;
        model.findAllReviewsForRecipe(recipeId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function deleteReviewById(req,res){
        var reviewId = req.params.reviewId;
        model.deleteReviewById(recipeId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function createReview(req,res){
        var review = req.body;
        model.createReview(review).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function updateReview(req,res){
        var reviewId = req.params.reviewId;
        var newReview = req.body;
        newRecipe.userId = userId;
        model.updateReviewById(reviewId,newReview).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }
}