"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeModel = void 0;
const mongoose_1 = require("mongoose");
const DataAccess_1 = require("../DataAccess");
const MealType_1 = require("../Enums/MealType");
const CuisineType_1 = require("../Enums/CuisineType");
const FeatureType_1 = require("../Enums/FeatureType");
const AllergyType_1 = require("../Enums/AllergyType");
const RecipeTag_1 = require("../Enums/RecipeTag");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
// let mongooseObg = DataAccess.mongooseInstance;
class RecipeModel {
    constructor() {
        RecipeModel.createSchema();
        RecipeModel.createModel();
    }
    static createSchema() {
        if (this.schema) {
            return;
        }
        this.schema = new mongoose_1.Schema({
            recipe_id: Number,
            name: String,
            member_id: Number,
            date: Date,
            steps: String,
            ingredients: [[Number, Number]],
            group: Number,
            cost: Number,
            photo: Buffer,
            likes: Number,
            meal_type: {
                type: String,
                enum: MealType_1.MealType,
            },
            cuisine_type: {
                type: String,
                enum: CuisineType_1.CuisineType,
            },
            feature_type: {
                type: String,
                enum: FeatureType_1.FeatureType,
            },
            restrictions: [
                {
                    type: String,
                    enum: AllergyType_1.AllergyType,
                }
            ],
            recipe_tags: [
                {
                    type: String,
                    enum: RecipeTag_1.RecipeTag,
                }
            ]
        }, { collection: 'recipes' });
    }
    static createModel() {
        if (this.model) {
            return;
        }
        this.model = mongooseConnection.model("Recipes", this.schema);
    }
    static retrieveAllRecipes(response) {
        let query = this.model.find({});
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }
    // TO-DO: change ObjectId to String for foreign key
    static retrieveRecipeByID(response, filter) {
        //let id = new ObjectId(filter);
        let query = this.model.findById(filter);
        query.exec((err, item) => {
            response.json(item);
        });
    }
    // TO-DO: allow finding names includeing keywords
    static retrieveRecipeByName(response, filter) {
        let query = this.model.find(filter);
        query.exec((err, item) => {
            response.json(item);
        });
    }
    // TO-DO: allow finding recipes with any combos of types
    static retrieveRecipeByType(response, filter) {
        console.log(filter);
        let query = this.model.find(filter);
        query.exec((err, item) => {
            response.json(item);
        });
    }
}
exports.RecipeModel = RecipeModel;
RecipeModel.createSchema();
RecipeModel.createModel();
