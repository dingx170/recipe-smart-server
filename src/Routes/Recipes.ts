import express, {Request, Response} from "express";

import {RecipeSchema} from '../Models/RecipeModel';


let recipesRoute = express.Router();

// view all recipes
recipesRoute.get("/", (req : Request, res : Response) => {
    res.send("Here are all the recipes!")
    console.log("View all recipes");
});

// view one recipe
recipesRoute.get("/:id", (req : Request, res : Response) => {
    res.send("Here is the recipe with id of " + req.params.id);

    // let Recipes = mongoose.model('Recipes', RecipeSchema, 'recipes');

    // Recipes.find({}, function(err, doc) {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     console.log(doc);
    // })


    console.log("View one recipe");
});

export {recipesRoute}