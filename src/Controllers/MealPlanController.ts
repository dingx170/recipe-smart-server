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

    private genearteRecipeList(recipelist: any[], group, budget, dish): Object[] {
        let recipes: {recipe: any, quatity: Number}[] = [];
        let total = 0;
        while(total < dish){
            var index = MealplanController.generateRandomNumber(recipelist.length);
            var recipe = recipelist[index];
            var quatity = Math.floor(group / recipe.group.valueOf());
            if(recipe.cost * quatity<= budget / dish){    
                recipes.push({recipe: recipe, quatity: quatity});
                total ++;      
            }
            recipelist.splice(index, 1);
        }
        console.log(recipes.length);
        return recipes;
    }

    private static generateRandomNumber(max: number){
        return Math.floor(Math.random()*Math.floor(max));
    }

    public test(req: Request, res: Response) {
        let a = req.body.recipelist;
        let g:number = req.query.group;
        let b:number = req.query.budget;
        let d:number = req.query.dish;
        let recipes: Object[] = this.genearteRecipeList(a, g, b, d);
        console.log(recipes.length);
        var shop = this.genearteShoppingList(recipes);
        res.send({recipes: recipes, shoplist:shop});
    }

    public genearteShoppingList(recipelist) {
        console.log(recipelist.length);
        let test: {ingredientId: Number, quantity: Number}[] = [];
        for(let i = 0; i < recipelist.length; i++) {
            let ingredientlist:[Number, Number][] = recipelist[i].recipe.ingredients;
            var recipe = recipelist[i];
            console.log(recipe.recipe.ingredients);
            for(let i = 0; i < ingredientlist.length; i++) {
                console.log(ingredientlist[i]);
                var ingredient = ingredientlist[i];
                let ingredientId: Number = ingredient[0];
                var index = test.findIndex((obj=>obj.ingredientId == ingredientId))
                console.log(index);
                if(index == -1){
                    var quatity = ingredient[1];
                    test.push({ingredientId:ingredientId, quantity:quatity});
                } else {
                    test[index].quantity = test[index].quantity.valueOf() + ingredient[1].valueOf();
                }
            }
        }
        console.log(test);
        return test;
    }
}

export {MealplanController};