import {Request, Response} from "express";
// import {RecipeModel} from '../Models/RecipeModel';
// import {MealplanModel} from '../Models/MealPlanModel';

class MealPlanController {


    // show a recommendation lis // need a method in recipemodel
    public static getRecipesByFilters(req: Request, res: Response) {

        let budget = req.query.budget; // < budget
        let meal_type: string[] = req.query.group; // < group
        let cuisine_type: string[] = req.query.cuisine_type; // == ||
        let feature_type: string[] = req.query.feature_type; // == ||
        let allergy_type: string[] = req.query.allergy; // == !(||)

        // RecipeModel.retrieveRecipeByFilter(res, {:});
    }

    // create meal plan
    public static postMealPlanCustomized(req: Request, res: Response) {

        // MealplanModel.createMealPlan(res, req);
    }

    // create meal plan
    public static postMealPlanOneClick(req: Request, res: Response) {

        // MealPlanController.getRecipesByFilters(req, res, ());


        // MealplanModel.createMealPlan(res, req);
    }

    private static genearteRecipeList() {
        
    }

    private static genearteShoppingList() {

    }
}