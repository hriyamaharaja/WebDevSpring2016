module.exports = function(app,model) {
    "use strict";

    var uuid = require('node-uuid');
    app.get('/api/project/user/:userId/recipe/', findAllRecipesForUser);
    app.delete('/api/project/recipe/:recipeId', deleteRecipeByIdForUser);
    app.post('/api/project/user/:userId/recipe/', createrecipeForUser);
    app.put('/api/project/recipe/:recipeId', updateRecipeByIdForUser);


    function findAllRecipesForUser(req,res){
        var userId = req.params.userId;
        var recipes = model.findAllRecipesForUser(userId);
        res.json(recipes);
    }

    function deleteRecipeByIdForUser(req,res){
        var userId = req.params.userId;
        var recipeId = req.params.recipeId;
        var recipes = model.deleteRecipeById(recipeId);
        res.json(recipes);
    }

    function createrecipeForUser(req,res){
        var userId = req.params.userId;
        var recipe = req.body;
        if (model.createRecipeForUser(userId,recipe)) {
            res.send(200);
            return;
        }
        res.json({message: "Recipe not created"});
    }

    function updateRecipeByIdForUser(req,res){
        var userId = req.params.userId;
        var recipeId = req.params.recipeId;
        var newRecipe = req.body;
        if (model.updateRecipeById(recipeId,newRecipe)) {
            res.send(200);
            return;
        }
        res.send(404);
    }
}