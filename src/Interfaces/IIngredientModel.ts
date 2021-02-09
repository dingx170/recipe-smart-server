import {ObjectId, Date, Document} from "mongoose"
import {AllergyType} from '../Enums/AllergyType'

interface IIngredientModel extends Document {
    name: String;
    unit: String;
    price: Number;
    restrictions: [AllergyType];
}

export {IIngredientModel};