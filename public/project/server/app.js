/**
 * Created by hriya on 3/19/16.
 */
module.exports = function (app,db,mongoose) {

    var userModel = require("./model/user.model.js")(db,mongoose);
    var userService = require("./services/user.service.server.js")(app, userModel);
    var recipeModel = require("./model/recipe.model.js")(db,mongoose);
    var reviewModel = require("./model/review.model.js")(db,mongoose);
    var reviewService = require("./services/review.service.server.js")(app,reviewModel);
    var recipeService = require("./services/recipe.service.server.js")(app, recipeModel);
    var userRecipeService = require("./services/user.recipe.service.server.js")(app, recipeModel);
};