/**
 * Created by hriya on 4/16/16.
 */
module.exports = function (mongoose) {
    var review = mongoose.Schema({
        userId: String,
        text: String
    });
    return review;
};