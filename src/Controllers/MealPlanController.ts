import {Request, Response} from "express";
import {RecipeModel} from '../Models/RecipeModel';
import {MealplanModel} from '../Models/MealPlanModel';

class MealplanController {
    private mealplan: MealplanModel
    private idGenerator: number = 100

    constructor(){
        this.mealplan = new MealplanModel();
        
    }

    public getMealplansByMemberId(req: Request, res: Response) {
        var memberId = req.params.memberid;
        console.log("Getting Member " + memberId + "'s mealplan");
        this.mealplan.retrieveAllMealplansByMemberId(res, {member_id: memberId});
    }

    public getShoppintListFromAMealplan(req: Request, res: Response) {
        var memberId = req.params.memberid;
        var mealplanId = req.params.mealplanid;
        console.log("Getting Member " + memberId + "'s mealplan " + mealplanId + "'s shoppinglist");
        this.mealplan.retrieveShoppinglistFromMealplan(res, {mealplan_id: mealplanId, member_id: memberId});
        console.log("View Member " + memberId + "'s mealplan " + mealplanId + "'s shoppinglist");
    }

    public getRecipeListFromAMealplan(req: Request, res: Response){
        var memberId = req.params.memberid;
        var mealplanId = req.params.mealplanid;
        console.log("Getting Member " + memberId + "'s mealplan " + mealplanId + "'s recipelist");
        this.mealplan.retrieveRecipelistFromMealplan(res, {mealplan_id: mealplanId, member_id: memberId});
        console.log("View Member " + memberId + "'s mealplan " + mealplanId + "'s recipelist");
    }

    public updateShoppinglistOfAMealplan(req: Request, res: Response){
        var memberId = req.params.memberid;
        var mealplanId = req.params.mealplanid;
        var shoppinglist = req.body;
        console.log("Update Member " + memberId + "'s mealplan " + mealplanId + "'s shoppinglist");
        this.mealplan.updateShoppinglist(res, {mealplan_id: mealplanId, member_id: memberId}, shoppinglist);
        console.log("View Member " + memberId + "'s mealplan " + mealplanId + "'s shoppinglist");
    }


    // private static MealPlanModel = new MealplanModel();
    // show a recommendation lis // need a method in recipemodel
    public static getRecipesByFilters(req: Request, res: Response) {

        let budget = req.query.budget; // < budget
        let meal_type: string[] = req.query.meal_type; // < group
        let cuisine_type: string[] = req.query.cuisine_type; // == ||
        let feature_type: string[] = req.query.feature_type; // == ||
        let allergy_type: string[] = req.query.allergy; // == !(||)

        var filter = {};
        filter['budget']= budget;
        if(meal_type){
            filter['meal_type'] = meal_type;
        }
        if(cuisine_type){
            filter['cuisine_type'] = cuisine_type;
        }
        if(feature_type){
            filter['feature_type'] = feature_type;
        }
        if(allergy_type){
            filter['allergy_type'] = allergy_type;
        }

        console.log(filter, meal_type);
        
        //RecipeModel.retrieveRecipeByFilter(res, filter);
    }

    // create meal plan
    public static postMealPlanCustomized(req: Request, res: Response, Mealplanmodel: MealplanModel) {
        
        let member_id = req.params.member_id;
        let mealplan = req.body;
        let recipe_list = mealplan.recipe_list;

        let shopping_list = [22,33,44];
        let mealplan_id = 101;
        
        console.log(mealplan);
        mealplan['mealplan_id'] = mealplan_id;
        mealplan['shopping_list'] = shopping_list;
        console.log(mealplan, recipe_list);
        Mealplanmodel.addNewMealPlan(res, mealplan);
    }

    // create meal plan
    public static postMealPlanOneClick(req: Request, res: Response) {

        // MealPlanController.getRecipesByFilters(req, res, ());


        // MealplanModel.createMealPlan(res, req);
    }

    public deleteMealplan(req: Request, res: Response) {
        let mealplanId = req.params.mealplanid;
        console.log({mealplan_id : mealplanId});
        this.mealplan.removeMealplan(res, {mealplan_id : mealplanId});
    }

    private static genearteRecipeList(recipelist: RecipeModel[]) {
        
    }

    private static genearteShoppingList() {

    }
}

export {MealplanController};