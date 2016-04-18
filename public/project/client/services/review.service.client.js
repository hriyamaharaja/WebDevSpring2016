/**
 * Created by hriya on 4/16/16.
 */
(function () {
    angular
        .module("RecipeWorld")
        .factory("ReviewService", reviewService);

    function reviewService($http) {

        var api = {
            findAllReviewsForUser: findAllReviewsForUser,
            findAllReviewsForRecipe: findAllReviewsForRecipe,
            deleteReviewById:deleteReviewById,
            createReview:createReview,
            updateReview:updateReview
        };
        return api;

        function findAllReviewsForUser(userId){
           return $http.get('/api/project/'+userId+'/review');

        }

        function findAllReviewsForRecipe(recipeId){
            return $http.get('/api/project/review/'+recipeId);

        }

        function deleteReviewById(reviewId){
            return $http.delete('/api/project/review/'+reviewId);

        }

        function createReview(review){
            return $http.post('/api/project/review',review);

        }

        function updateReview(reviewId,review){
           return $http.put('/api/project/review/'+reviewId,review);

        }


    }
})();