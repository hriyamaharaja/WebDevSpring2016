module.exports = function(app,model) {
    "use strict";


    app.get('/api/project/user/:userId/recipe/', findAllRecipesForUser);
    app.delete('/api/project/recipe/:recipeId', deleteRecipeByIdForUser);
    app.post('/api/project/user/:userId/recipe/', createrecipeForUser);
    app.put('/api/project/recipe/:recipeId', updateRecipeByIdForUser);


    function findAllRecipesForUser(req,res){
        var userId = req.params.userId;
        model.findAllRecipesForUser(userId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function deleteRecipeByIdForUser(req,res){
        var userId = req.params.userId;
        var recipeId = req.params.recipeId;
        model.deleteRecipeById(recipeId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function createrecipeForUser(req,res){
        var userId = req.params.userId;
        var recipe = req.body;
        model.createRecipeForUser(userId,recipe).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function updateRecipeByIdForUser(req,res){
        var userId = req.params.userId;
        var recipeId = req.params.recipeId;
        var newRecipe = req.body;

        model.updateRecipeById(recipeId,newRecipe).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }
}