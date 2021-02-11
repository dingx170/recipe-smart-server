import {Request, Response} from "express";
import {RecipeModel} from '../Models/RecipeModel';

class RecipeController {

    public static getRecipeByID(req: Request, res: Response) {

        // 3. analyze request and use model to modify db data
        let id = req.params.id;

        RecipeModel.retrieveRecipeByID(res, {recipe_id: id});

        console.log("View one recipe by id");
    }

    public static getRecipesByFilters(req: Request, res: Response) {

        let name = req.query.name;
        let meal_type = req.query.meal_type;
        let cuisine_type = req.query.cuisine_type;
        let feature_type = req.query.feature_type;

        if (name) {
            RecipeModel.retrieveRecipeByName(res, {name: name});
            console.log("View recipes by name");
        } else if (meal_type || cuisine_type || feature_type) {
            RecipeModel.retrieveRecipeByType(res, {meal_type: meal_type, cuisine_type: cuisine_type, feature_type: feature_type});
            console.log("View recipes by type");
        } else {
            RecipeModel.retrieveAllRecipes(res);
            console.log("View all recipes");
        }

    }

    public static getRecipesByMemberID(req: Request, res: Response) {

        let member_id = req.params.member_id;

        RecipeModel.retrieveRecipesByMemberID(res, {member_id: member_id});
    }

    public static postRecipeByMemberID(req: Request, res: Response) {
        
        let new_recipe = req.body;

        RecipeModel.createRecipeByMemberID(res, new_recipe);
    }

    public static putRecipe(req: Request, res: Response) {
        
        let new_recipe = req.body;
        let recipe_id = new_recipe.recipe_id;

        RecipeModel.updateRecipe(res, {recipe_id : recipe_id}, new_recipe);
    }
}

export {RecipeController}