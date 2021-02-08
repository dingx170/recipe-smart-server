import  {Schema} from "mongoose"
import {DataAccess} from '../DataAccess'
import {IIngredientModel} from '../Interfaces/IIngredientModel'
import {AllergyType} from '../Enums/AllergyType'
import { ObjectId } from "mongodb"

let mongooseConnection = DataAccess.mongooseConnection;

class IngredientModel{
    public schema: any;
    public model: any;


    public constructor() {
        this.createSchema();
        this.createModel();
      }
    
      public createSchema(): void {
        this.schema = new Schema(
          {
            name: String,
            unit: String,
            price: Number,
            restrictions: [
              {
                type: String,
                enum: AllergyType,
              }
              ]
          }, {collection: 'ingredients'}
        );
      }
    
    public createModel(): void {
        this.model = mongooseConnection.model<IIngredientModel>("Ingredients", this.schema);
    }

    // TO-DO: change ObjectId to String for foreign key
    public retrieveIngredientByID(response: any, filter: Object): any {
        //let id = new ObjectId(filter);
        let query = this.model.findById(filter);
        query.exec( (err, item) => {
            response.json(item);
        });
    }

      // TO-DO: allow finding names includeing keywords
    public retrieveRecipeByName(response: any, filter: Object): any { 
        let query = this.model.find(filter);
        query.exec( (err, item) => {
            response.json(item);
        });
    }
}

export {IngredientModel};

