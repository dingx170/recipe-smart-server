import {Router} from "express";
import { MealplanController } from "../Controllers/MealPlanController";
import { MealplanModel } from "../Models/MealplanModel";
class MealplanRoute {
    private static mealplanController = new MealplanController()
    //static mealplan: MealplanModel = new MealplanModel()
    static idGenerator = 100
    public static registerMealplanRoutes(mealplanRouter: Router){
        mealplanRouter.get('/mealplan/:memberid', (req, res)=> {
            this.mealplanController.getMealplansByMemberId(req, res);
        })

        mealplanRouter.post('/mealplan/:memberid', (req, res) => {
            var mealplan = req.body;
            mealplan.mealplan_id = this.idGenerator;
            console.log("Adding mealplan " + this.idGenerator);
            //this.mealplan.addNewMealPlan(res, mealplan);
            console.log("Added mealplan " + this.idGenerator);            
            this.idGenerator++;
        });
        mealplanRouter.get('/mealplan/:memberid/:mealplanid/shoppinglist', (req, res)=> {
            this.mealplanController.getShoppintListFromAMealplan(req, res);
        });
        mealplanRouter.get('/mealplan/:memberid/:mealplanid/recipelist', (req, res)=> {
            this.mealplanController.getRecipeListFromAMealplan(req, res);
        });
        mealplanRouter.put('/mealplan/:memberid/:mealplanid/shoppinglist', (req, res)=> {
            this.mealplanController.updateShoppinglistOfAMealplan(req, res);
        });
        mealplanRouter.delete('/mealplan/:memberid/:mealplanid', (req, res)=> {
            this.mealplanController.deleteMealplan(req, res);
        });
    }
}
export {MealplanRoute}