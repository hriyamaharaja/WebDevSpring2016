/**
 * Created by hriya on 4/1/16.
 */
module.exports = function (mongoose) {
    var field = mongoose.Schema({
        label: String,
        type: {type: String, enum: ["TEXT", "TEXTAREA", "DATE", "OPTIONS", "RADIOS", "CHECKBOXES"]},
        placeholder: String,
        options: [{label: String, value: String}]
    });
    return field;
};