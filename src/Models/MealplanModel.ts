import  {Schema} from "mongoose"
import {DataAccess} from '../DataAccess'
import {MealType} from '../Enums/MealType'
import {CuisineType} from '../Enums/CuisineType'
import {FeatureType} from '../Enums/FeatureType'
import {AllergyType} from '../Enums/AllergyType'
import { IMealplanModel } from "../Interfaces/IMealplanModel"

let mongooseConnection = DataAccess.mongooseConnection;

class MealplanModel {
    public schema: any;
    public model: any;

    public constructor() {
        
    }

    public createSchema(): void {
        this.schema = new Schema(
            {
                mealplan_id: {
                  type: Number,
                  unique: true,
                  required: true
                },
                member_id: Schema.Types.ObjectId,
                date: Date,
                budget: Number,
                group: Number,
                recipe_list: [Schema.Types.ObjectId],
                shopping_list: [Schema.Types.ObjectId],
                meal_type: {
                    type: String,
                    enum: MealType,
                  },
                cuisine_type: {
                    type: String,
                    enum: CuisineType,
                  },
                feature_type: {
                    type: String,
                    enum: FeatureType,
                  },
                restrictions: [
                    {
                      type: String,
                      enum: AllergyType,
                    }
                ]
            }, {collection: 'mealplans'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IMealplanModel>("Mealplans", this.schema);
    }

    public addNewMealPlan(response: any, body: any) {
        this.model(body).save((err, mealplan)=>{
          if(err) {
            response.send(err);
          }
          response.json(mealplan);
        })
    }
    
    //TODO: ID data type need to be determined
    public retrieveAllMealplansByMemberId(response: any, filter: Object): any {
        let query = this.model.find(filter);
        query.exec((err, itemArray) => {
          response.json(itemArray);
        });
    }

    // Get shopping list of a mealplan
    public retrieveShoppinglistFromMealplan(response: any, filter: Object): any {
      let query = this.model.findById(filter).select('shopping_list');
      query.exec((err, item) => {
        response.json(item);
      })
    }

    // Get recipe list of a mealplan
    public retrieveRecipelistFromMealplan(response: any, filter:Object): any {
      let query = this.model.findById(filter).select('recipe_list');
      query.exec((err, item) => {
        response.json(item);
      })
    }

    public updateShoppinglist(response: any, body: any, filter: Object) {
      this.model.findOneAndUpdate(filter, body, {new: true}, (err, mealplan) => {
        if(err){
          response.send(err);
        }
        console.log("Update mealplan" + mealplan.mealplan_id)
        response.json(mealplan);
      });
      
    }

}