/**
 * Created by hriya on 3/19/16.
 */

module.exports = function(app) {
    "use strict";
    var http = require('request');

    var uuid = require('node-uuid');
    app.get('/api/project/recipe/', findRecipes);
    app.get('/api/project/recipe/:recipeId', findRecipeByID);


    var apiID = "89be9cee";
    var apiKey = "2c618bbaa7d11fd628e3583700f68c6b";

    function findRecipes(req,res) {

        var ingredient = req.query.ingredients;
        var diet = req.query.diet;
        var cuisine = req.query.cuisine;
        var search = req.query.recipe;

        var query = {
            "_app_id": apiID,
            "_app_key": apiKey,
            "allowedIngredient[]": ingredient,
            "allowedDiet[]": diet,
            "allowedCuisine[]": cuisine,
            "q": search

        }

        getResponseForSearch(query, function (data) {
            res.send(data);
        });
    }

    function getResponseForSearch(query,callback){



        http({
            url: "http://api.yummly.com/v1/api/recipes",
            method: "GET",
            qs : query,
            timeout: 10000
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {


                callback(body);
            }
            else
            {
                callback({message: "Error"});
            }
        });

    }

    function findRecipeByID(req,res) {

        getResponse(req.params.recipeId,function(data){
            res.send(data);
        });
    }

    function getResponse(id,callback){
        var recipeID = id;
        var recipe = {};

        http({
            url: "http://api.yummly.com/v1/api/recipe/" + recipeID+"?_app_id=89be9cee&_app_key=2c618bbaa7d11fd628e3583700f68c6b",
            method: "GET",
            timeout: 10000
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(body);
            }
            else
            {
                callback({message: "Error"});
            }
        });
    }
}