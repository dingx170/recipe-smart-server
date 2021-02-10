import express, {Request, Response} from "express";
import * as url from 'url';

import {MealplanModel} from '../Models/MealplanModel';
class Mealplan {
    public Mealplan:MealplanModel
    //public mealplanRouter:express.Router()
    private idGenerator:number

    constructor(){
        this.Mealplan = new MealplanModel();
        this.idGenerator = 1000;
    }

    public registerRoutes(router: express.Router){
        this.route(router);
    }

    private route(router: express.Router): void{
        router.get('/mealplan', (req, res)=> {
            console.log("get mealplan");
            var hello = "Hello Mealplan";
            res.send(hello);
        })
        router.get('/mealplan/:memberid', (req, res)=> {
            var memberId = req.params.memberid;
            console.log("Getting Member " + memberId + "'s mealplan");
            this.Mealplan.retrieveAllMealplansByMemberId(res, {member_id: memberId});
            console.log("View mealplan of Member " + memberId);
        });
        router.post('/mealplan/:memberid', (req, res) => {
            var mealplan = req.body;
            mealplan.mealplan_id = this.idGenerator;
            console.log("Adding mealplan " + this.idGenerator);
            this.Mealplan.addNewMealPlan(res, mealplan);
            console.log("Added mealplan " + this.idGenerator);            
            this.idGenerator++;
        });
        router.get('/mealplan/:memberid/:mealplanid/shoppinglist', (req, res)=> {
            var memberId = req.params.memberid;
            var mealplanId = req.params.mealplanid;
            console.log("Getting Member " + memberId + "'s mealplan " + mealplanId + "'s shoppinglist");
            this.Mealplan.retrieveShoppinglistFromMealplan(res, {mealplan_id: mealplanId, member_id: memberId});
            console.log("View Member " + memberId + "'s mealplan " + mealplanId + "'s shoppinglist");
        });
        router.get('/mealplan/:memberid/:mealplanid/recipelist', (req, res)=> {
            var memberId = req.params.memberid;
            var mealplanId = req.params.mealplanid;
            console.log("Getting Member " + memberId + "'s mealplan " + mealplanId + "'s recipelist");
            this.Mealplan.retrieveRecipelistFromMealplan(res, {mealplan_id: mealplanId, member_id: memberId});
            console.log("View Member " + memberId + "'s mealplan " + mealplanId + "'s recipelist");
        });
        router.put('/mealplan/:memberid/:mealplanid/shoppinglist', (req, res)=> {
            var memberId = req.params.memberid;
            var mealplanId = req.params.mealplanid;
            var shoppinglist = req.body;
            console.log("Update Member " + memberId + "'s mealplan " + mealplanId + "'s shoppinglist");
            this.Mealplan.updateShoppinglist(res, {mealplan_id: mealplanId, member_id: memberId}, shoppinglist);
            console.log("View Member " + memberId + "'s mealplan " + mealplanId + "'s shoppinglist");
        });
        
    }
}
export{Mealplan}