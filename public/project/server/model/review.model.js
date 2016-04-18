/**
 * Created by hriya on 4/16/16.
 */
var q = require("q");

module.exports = function (db,mongoose) {

    var ReviewSchema = require("./review.server.schema.js")(mongoose);
    var ReviewModel = mongoose.model('Review', ReviewSchema);


    var api = {
        createReview: createReview,
        findAllReviewsForUser: findAllReviewsForUser,
        findAllReviewsForRecipe:findAllReviewsForRecipe,
        deleteReviewById: deleteReviewById,
        updateReviewById: updateReviewById
    };

    return api;

    function createReview(review) {
        var deferred = q.defer();


        ReviewModel.create(review, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllReviewsForUser(userId) {
        var deferred = q.defer();

        ReviewModel.find({userId: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }

    function findAllReviewsForRecipe(recipeId) {
        var deferred = q.defer();

        ReviewModel.find({recipeId: recipeId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }

    function deleteReviewById(review_Id) {

        var deferred = q.defer();

        ReviewModel.remove({_id: review_Id}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateReviewById(review_Id, newReview) {
        var deferred = q.defer();

        RecipeModel.update({_id: review_Id}, {$set: newReview}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
}