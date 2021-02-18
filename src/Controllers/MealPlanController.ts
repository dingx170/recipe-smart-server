import {Request, Response} from "express";
import {RecipeModel} from '../Models/RecipeModel';
import {MealplanModel} from '../Models/MealPlanModel';

class MealplanController {
    private mealplan: MealplanModel
    private idGenerator: number = 10000

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


  
    // show a recommendation lis // need a method in recipemodel
    /**
     * Get a recommendation list of recipes based on given parameters
     * @param req 
     * @param res 
     */
    public getRecipesByFilters(req: Request, res: Response) {

        let budget = req.query.budget; // < budget
        let group = req.query.group;
        let meal_type: string[] = req.query.meal_type; // < group
        let cuisine_type: string[] = req.query.cuisine_type; // == ||
        let feature_type: string[] = req.query.feature_type; // == ||
        let allergy_type: string[] = req.query.allergy; // == !(||)

        var filter = {};
        filter['cost']= {'$lte': budget};
        filter['group'] = group;
        if(meal_type){
            filter['meal_type'] = {'$in': meal_type};
        }
        if(cuisine_type){
            filter['cuisine_type'] = {'$in': cuisine_type};
        }
        if(feature_type){
            filter['feature_type'] = {'$in': feature_type};
        }
        if(allergy_type){
            filter['allergy_type'] = {'$nin': allergy_type};
        }

        console.log(filter, meal_type);
        
        RecipeModel.retrieveRecipesWithFilter(res, filter);
    }

    /**
     * Post a mealplan by customization
     * 
     */
    public postMealPlanCustomized(req: Request, res: Response) {
        
        let member_id = req.params.memberid;
        let mealplan = {};
        let body = req.body;
        let recipes = body.recipe_list;
        let budget = req.body.budget; // < budget
        let group = req.body.group; // < group
        let meal_type: string[] = req.body.meal_type; 
        let cuisine_type: string[] = req.body.cuisine_type; // == ||
        let feature_type: string[] = req.body.feature_type; // == ||
        let allergy_type: string[] = req.body.allergy; // == !(||)

        let shoppinglist = this.genearteShoppingList(recipes);
        let recipelist = this.generateRecipeId(recipes);
        let mealplan_id = this.idGenerator;
        console.log(member_id + " is adding mealpplan");
        mealplan['member_id'] = member_id;
        mealplan['mealplan_id'] = mealplan_id;
        mealplan['recipe_list'] = recipelist;
        mealplan['shopping_list'] = shoppinglist;
        mealplan['budget']= budget;
        mealplan['group'] = group;
        if(meal_type){
            mealplan['meal_type'] = meal_type;
        }
        if(cuisine_type){
            mealplan['cuisine_type'] = cuisine_type;
        }
        if(feature_type){
            mealplan['feature_type'] = feature_type;
        }
        if(allergy_type){
            mealplan['allergy_type'] = allergy_type;
        }

        console.log(mealplan);
        this.idGenerator ++;
        //res.send(mealplan);
        this.mealplan.addNewMealPlan(res, mealplan);
        
    }

    /**
     * Not avaliable
     * FIXME: fix async problem
     * Post mealplan with one click
     * @param req request
     * @param res response
     */
    public async postMealPlanOneClick(req: Request, res: Response) {
        let member_id = req.params.memberid;
        let mealplan = {};
        let budget = req.query.budget; // < budget
        let group = req.query.group; // < group
        let meal_type: string[] = req.query.meal_type; 
        let cuisine_type: string[] = req.query.cuisine_type; // == ||
        let feature_type: string[] = req.query.feature_type; // == ||
        let allergy_type: string[] = req.query.allergy; // == !(||)

        let mealplan_id = this.idGenerator;
        let filter = this.generateFilter(req);
        RecipeModel.retrieveRecipesForMealPlan(filter).then(function(res){
            let recipepool = res;
            console.log(recipepool);
        let recipes = this.genearteRecipeList(recipepool, budget, group);
        let recipelist = this.generateRecipeId(recipes);
        let shoppinglist = this.genearteShoppingList(recipes);

        mealplan['member_id'] = member_id;
        mealplan['mealplan_id'] = mealplan_id;
        mealplan['recipe_list'] = recipelist;
        mealplan['shopping_list'] = shoppinglist;
        mealplan['budget']= budget;
        mealplan['group'] = group;
        if(meal_type){
            mealplan['meal_type'] = meal_type;
        }
        if(cuisine_type){
            mealplan['cuisine_type'] = cuisine_type;
        }
        if(feature_type){
            mealplan['feature_type'] = feature_type;
        }
        if(allergy_type){
            mealplan['allergy_type'] = allergy_type;
        }

        this.idGenerator ++;
        console.log(mealplan);
        res.send(mealplan);
        }).catch(function(err){
            console.log(err);
        })
        
        // MealplanModel.createMealPlan(res, req);
    }


    /**
     * delete mealplan
     * @param req request
     * @param res response
     */
    public deleteMealplan(req: Request, res: Response) {
        let mealplanId = req.params.mealplanid;
        console.log({mealplan_id : mealplanId});
        this.mealplan.removeMealplan(res, {mealplan_id : mealplanId});
    }

    /**
     * Generator an Object store all the filters
     */
    private generateFilter(req: Request): Object {
        let budget = req.query.budget; // < budget
        let group = req.query.group;
        let meal_type: string[] = req.query.meal_type; // < group
        let cuisine_type: string[] = req.query.cuisine_type; // == ||
        let feature_type: string[] = req.query.feature_type; // == ||
        let allergy_type: string[] = req.query.allergy; // == !(||)

        var filter = {};
        filter['cost']= {'$lte': budget};
        filter['group'] = group;
        if(meal_type){
            filter['meal_type'] = {'$in': meal_type};
        }
        if(cuisine_type){
            filter['cuisine_type'] = {'$in': cuisine_type};
        }
        if(feature_type){
            filter['feature_type'] = {'$in': feature_type};
        }
        if(allergy_type){
            filter['allergy_type'] = {'$nin': allergy_type};
        }
        return filter;
    }

    /**
     * Create a list of recipe satisfied budget and dish. The recipes are
     * selected from recipelist.
     * @param recipelist List of recipe
     * @param budget budget
     * @param dish total number of dishes required
     */
    private genearteRecipeList(recipelist, budget: number, dish: number): Object[] {
        console.log('recipelist');
        console.log(typeof recipelist);
        let recipes: {recipe: any, quatity: Number}[] = [];
        let total = 0;
        while(total < dish){
            var index = MealplanController.generateRandomNumber(recipelist.length);
            var recipe = recipelist[index];
            var quatity = 1;
            if(recipe.cost <= budget / dish){    
                recipes.push({recipe: recipe, quatity: quatity});
                total ++;      
            }
            recipelist.splice(index, 1);
        }
        //console.log(recipes.length);
        return recipes;
    }

    /**
     * Generate an random number
     * @param max bond of random number generator
     */
    private static generateRandomNumber(max: number){
        return Math.floor(Math.random()*Math.floor(max));
    }

    /*
    * method for testing only
    */
    public test(req: Request, res: Response) {
        let a = req.body.recipelist;
        let g:number = req.query.group;
        let b:number = req.query.budget;
        let d:number = req.query.dish;
        let recipes: Object[] = this.genearteRecipeList(a, b, d);
        console.log(recipes.length);
        var shop = this.genearteShoppingList(recipes);
        res.send({recipes: recipes, shoplist:shop});
    }

    /**
     * generate a shopping list from a given recipe list
     * @param recipelist: List of recipe
     */
    public genearteShoppingList(recipelist: any[]) {
        //console.log(recipelist.length);
        let test: {ingredient_id: Number, quantity: Number}[] = [];
        for(let i = 0; i < recipelist.length; i++) {
            let ingredientlist:[Number, Number][] = recipelist[i].recipe.ingredients;
            var recipe = recipelist[i];
            //console.log(recipe.recipe.ingredients);
            for(let i = 0; i < ingredientlist.length; i++) {
                //console.log(ingredientlist[i]);
                var ingredient = ingredientlist[i];
                let ingredientId: Number = ingredient[0];
                var index = test.findIndex((obj=>obj.ingredient_id == ingredientId))
                //console.log(index);
                if(index == -1){
                    var quatity = ingredient[1];
                    test.push({ingredient_id:ingredientId, quantity:quatity});
                } else {
                    test[index].quantity = test[index].quantity.valueOf() + ingredient[1].valueOf();
                }
            }
        }
        //console.log(test);
        return test;
    }

    /**
     * generate a list of {recipe_id: Number, quatity: Number} from
     * a list of RecipeModel
     * @param recipes list of RecipeModel
     */
    private generateRecipeId(recipes: any[]){
        let recipelist: {recipe_id: Number, quantity: Number}[] = [];
        for(let i = 0; i < recipes.length; i++){
            console.log(recipes[i]);
            let recipe = recipes[i].recipe;
            let quantity = recipes[i].quantity;
            let recipe_id = recipe.recipe_id;
            recipelist.push({recipe_id: recipe_id, quantity: quantity});
        }
        return recipelist;
    }
}

export {MealplanController};