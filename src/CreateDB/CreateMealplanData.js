db = db.getSiblingDB('testDB')
db.createCollection('mealplans')
mealplansCollection = db.getCollection("mealplans")
mealplansCollection.remove({})

mealplansCollection.insert({
    mealplan_id: 11,
    member_id: 123,
    budget: 30,
    date: new Date("2021-02-15T17:00:00Z"),
    group: 2,
    recipe_list: [{recipe_id:4,quantity:1}, {recipe_id:9, quantity: 1}],
    shopping_list: [{ingredient_id:10, quantity:1}, {ingredient_id:4, quantity:1},{ingredient_id:6, quantity:1}],
    meal_type: ["Dinner"],
    cuisine_type: null,
    feature_type: null,
    restrictions: ["Nut","Milk"]
})

mealplansCollection.insert({
    mealplan_id: 12,
    member_id: 123,
    budget: 20,
    date: new Date("2021-01-21T15:21:00Z"),
    group: 2,
    recipe_list: [{recipe_id:5,quantity:1}, {recipe_id:3, quantity: 1}],
    shopping_list: [{ingredient_id:10, quantity:1}, {ingredient_id:9, quantity:1},{ingredient_id:6, quantity:1}],
    meal_type: ["Breakfast"],
    cuisine_type: null,
    feature_type: null,
    restrictions: null
})

mealplansCollection.insert({
    mealplan_id: 13,
    member_id: 123,
    budget: 50,
    date: new Date("2021-01-15T16:05:00Z"), 
    group: 3,
    recipe_list: [{recipe_id:9,quantity:1}, {recipe_id:10, quantity: 1}],
    shopping_list: [{ingredient_id:1, quantity:1}, {ingredient_id:2, quantity:1},{ingredient_id:6, quantity:1}, {ingredient_id:7, quantity:1}],
    meal_type: ["Dinner"],
    cuisine_type: null,
    feature_type: null,
    restrictions: ["Nut"]
})