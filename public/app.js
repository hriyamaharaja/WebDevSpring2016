/**
 * Created by hriya on 4/18/16.
 */
module.exports = function (app,db,mongoose) {

    //assignment
    var assgnUserModel = require("./assignments/server/models/user.model.js")(db,mongoose);
    var projuserModel = require("./project/server/model/user.model.js")(db,mongoose);
    require("./assignments/server/services/user.service.server.js")(app, assgnUserModel);
    require("./project/server/services/user.service.server.js")(app, assgnUserModel,projuserModel);
    var formModel = require("./assignments/server/models/form.model.js")(db,mongoose);
    var fieldModel = require("./assignments/server/models/fields.model.js")(db,mongoose);
    require("./assignments/server/services/form.service.server.js")(app, formModel);
    require("./assignments/server/services/field.service.server.js")(app, fieldModel);


    //proj
    var recipeModel = require("./project/server/model/recipe.model.js")(db,mongoose);
    var reviewModel = require("./project/server/model/review.model.js")(db,mongoose);
    require("./project/server/services/review.service.server.js")(app,reviewModel);
    require("./project/server/services/recipe.service.server.js")(app, recipeModel);
    require("./project/server/services/user.recipe.service.server.js")(app, recipeModel);
    var followerModel = require("./project/server/model/follower.model.js")(db,mongoose);
    require("./project/server/services/follower.service.server.js")(app,followerModel);

};