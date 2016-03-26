/**
 * Created by hriya on 3/19/16.
 */
module.exports = function (app) {

    var userModel = require("./model/user.model.js")();
    var userService = require("./services/user.service.server.js")(app, userModel);
    var recipeModel = require("./model/recipe.model.js")();
    var recipeService = require("./services/recipe.service.server.js")(app, recipeModel);
    var userRecipeService = require("./services/user.recipe.service.server.js")(app, recipeModel);
};