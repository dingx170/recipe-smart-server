import express, {Request, Response} from "express";
import * as url from 'url';

import {RecipeModel} from '../Models/RecipeModel';


let recipesRoute = express.Router();
let recipes = new RecipeModel();  // TO-DO: maybe make it singleton

// view all recipes
// recipesRoute.get("", (req : Request, res : Response) => {
//     console.log("View all recipes");

//     recipes.retrieveAllRecipes(res);
// });

// view one recipe by id // ./recipes/ababababa
recipesRoute.get("/:id", (req : Request, res : Response) => {
    let id = req.params.id;

    recipes.retrieveRecipeByID(res, {recipe_id: id});

    console.log("View one recipe by id");
});
//Above route shades the /filter route

// view all or one through filtration
// view one recipe by name // ./recipes?name=xxx&meal_type=xxx&...
recipesRoute.get("", (req : Request, res : Response) => {

    let name = req.query.name;
    let meal_type = req.query.meal_type;
    let cuisine_type = req.query.cuisine_type;
    let feature_type = req.query.feature_type;

    console.log(name);
    console.log(meal_type);
    console.log(cuisine_type);
    console.log(feature_type);

    if (name) {
        recipes.retrieveRecipeByName(res, {name: name});
        console.log("View recipes by name");
    } else if (meal_type || cuisine_type || feature_type) {
        recipes.retrieveRecipeByType(res, {meal_type: meal_type, cuisine_type: cuisine_type, feature_type: feature_type});
        console.log("View recipes by type");
    } else {
        recipes.retrieveAllRecipes(res);
        console.log("View all recipes");
    }
});

export {recipesRoute}