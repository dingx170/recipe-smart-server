db = db.getSiblingDB('testDB')
db.createCollection('mealplans')
mealplansCollection = db.getCollection("mealplans")
mealplansCollection.remove({})

mealplansCollection.insert({
    mealplan_id: 11,
    member_id: 123,
    budget: 30,
    group: 2,
    recipe_list: [{recipe_id:5,quantity:1}, {recipe_id:9, quantity: 1}],
    shopping_list: [{ingredient_id:10, quantity:1}, {ingredient_id:9, quantity:1},{ingredient_id:6, quantity:1}],
    meal_type: null,
    cuisine_type: null,
    feature_type: null,
    restrictions: null
})

mealplansCollection.insert({
    mealplan_id: 12,
    member_id: 123,
    budget: 20,
    group: 2,
    recipe_list: [{recipe_id:5,quantity:1}, {recipe_id:4, quantity: 1}],
    shopping_list: [{ingredient_id:10, quantity:1}, {ingredient_id:9, quantity:1},{ingredient_id:6, quantity:1}],
    meal_type: null,
    cuisine_type: null,
    feature_type: null,
    restrictions: null
})

mealplansCollection.insert({
    mealplan_id: 13,
    member_id: 123,
    budget: 50,
    group: 3,
    recipe_list: [{recipe_id:9,quantity:1}, {recipe_id:10, quantity: 1}],
    shopping_list: [{ingredient_id:1, quantity:1}, {ingredient_id:2, quantity:1},{ingredient_id:6, quantity:1}, {ingredient_id:7, quantity:1}],
    meal_type: null,
    cuisine_type: null,
    feature_type: null,
    restrictions: ["Nut"]
})