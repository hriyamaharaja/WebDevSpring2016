/**
 * Created by hriya on 4/18/16.
 */
module.exports = function (app,db,mongoose) {

    var assgnUserModel = require("./models/user.model.js")(db,mongoose);
    require("./services/user.service.server.js")(app, assgnUserModel);
    var formModel = require("./models/form.model.js")(db,mongoose);
    var fieldModel = require("./models/fields.model.js")(db,mongoose);
    require("./services/form.service.server.js")(app, formModel);
    require("./services/field.service.server.js")(app, fieldModel);

    var userModel = require("./model/user.model.js")(db,mongoose);
    require("./services/user.service.server.js")(app, userModel);
    var recipeModel = require("./model/recipe.model.js")(db,mongoose);
    var reviewModel = require("./model/review.model.js")(db,mongoose);
    require("./services/review.service.server.js")(app,reviewModel);
    require("./services/recipe.service.server.js")(app, recipeModel);
    require("./services/user.recipe.service.server.js")(app, recipeModel);
    var followerModel = require("./model/follower.model.js")(db,mongoose);
    require("./services/follower.service.server.js")(app,followerModel);

};