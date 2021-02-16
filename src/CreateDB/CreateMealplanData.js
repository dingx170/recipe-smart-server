db = db.getSiblingDB('testDB')
db.createCollection('mealplans')
mealplansCollection = db.getCollection("mealplans")
mealplansCollection.remove({})

mealplansCollection.insert({
    mealplan_id: 11,
    member_id: 123,
    budget: 30,
    group: 2,
    recipe_list: [{20:1}, {21: 2}],
    shopping_list: [{20:1}, {21: 2}],
    meal_type: null,
    cuisine_type: null,
    feature_type: null,
    restrictions: null
})