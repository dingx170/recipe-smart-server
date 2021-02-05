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
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new mongoose_1.Schema({
            name: String,
            member_id: mongoose_1.Schema.Types.ObjectId,
            date: Date,
            steps: String,
            ingredients: [[mongoose_1.Schema.Types.ObjectId, Number]],
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
    createModel() {
        this.model = mongooseConnection.model("Recipes", this.schema);
    }
    retrieveAllRecipes(response) {
        var query = this.model.find({});
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }
}
exports.RecipeModel = RecipeModel;
