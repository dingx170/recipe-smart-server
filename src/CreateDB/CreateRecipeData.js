db = db.getSiblingDB('testDB')
db.createCollection('recipes')
recipesCollection = db.getCollection("recipes")
recipesCollection.remove({})




recipesCollection.insert({
    recipe_id: 1,
    name: "garden salad",
    member_id: 5,
    steps: ["step1","step2","step3"],
    ingredients: [[3,1],[6,1]],
    group: 1,
    cost: 10,
    unit_cost: 10,
    likes: 964,
    meal_type: "Lunch",
    cuisine_type: "Italian",
    feature_type: "vegetarian",
    restrictions: null,
    recipe_tags: "Popular"
})

recipesCollection.insert({
    recipe_id: 2,
    name: "avacado gimbap",
    member_id: 6,
    steps: ["step1","step2","step3","step4"],
    ingredients: [[8,1],[9,1]],
    group: 1,
    cost: 10,
    unit_cost: 10,
    likes: 1537,
    meal_type: "Lunch",
    cuisine_type: "Japanese",
    feature_type: "vegetarian",
    restrictions: null,
    recipe_tags: "CostEffective"
})

recipesCollection.insert({
    recipe_id: 3,
    name: "berry sandwich",
    member_id: 7,
    steps: ["step1","step2","step3","step4"],
    ingredients: [[10,1],[9,1],[2,1]],
    group: 1,
    cost: 10,
    unit_cost: 10,
    likes: 1343,
    meal_type: "Breakfast",
    cuisine_type: "Spanish",
    feature_type: "MeatLover",
    restrictions: null,
    recipe_tags: "GoldenRecipe"
})

recipesCollection.insert({
    recipe_id: 4,
    name: "caesar salad",
    member_id: 5,
    steps: ["step1","step2","step3","step4"],
    ingredients: [[4,1],[3,1],[10,1]],
    group: 1,
    cost: 10,
    unit_cost: 10,
    likes: 8759,
    meal_type: "Dinner",
    cuisine_type: "Creek",
    feature_type: "vegetarian",
    restrictions: null,
    recipe_tags: "Popular"
})

recipesCollection.insert({
    recipe_id: 5,
    name: "sausage sandwich",
    member_id: 8,
    steps: ["step1","step2","step3","step4"],
    ingredients: [[10,1],[9,1],[6,1]],
    group: 1,
    cost: 10,
    unit_cost: 10,
    likes: 14645,
    meal_type: "Breakfast",
    cuisine_type: "Italian",
    feature_type: "MeatLover",
    restrictions: ["Egg","Meat"],
    recipe_tags: "GoldenRecipe"
})

recipesCollection.insert({
    recipe_id: 6,
    name: "beef hash",
    member_id: 3,
    steps: ["step1","step2","step3"],
    ingredients: [[2,1],[7,1],[6,1]],
    group: 2,
    cost: 20,
    unit_cost: 10,
    likes: 86631,
    meal_type: "Breakfast",
    cuisine_type: "Italian",
    feature_type: "MeatLover",
    restrictions: ["Egg","Meat"],
    recipe_tags: "Popular"
})

recipesCollection.insert({
    recipe_id: 7,
    name: "roast salmon",
    member_id: 2,
    steps: ["step1","step2","step3","step4"],
    ingredients: [[5,1],[6,1]],
    group: 2,
    cost: 20,
    unit_cost: 10,
    likes: 1225,
    meal_type: "Dinner",
    cuisine_type: "Spanish",
    feature_type: "MeatLover",
    restrictions: ["Fish","Meat"],
    recipe_tags: "CostEffective"
})

recipesCollection.insert({
    recipe_id: 8,
    name: "potato beef tender",
    member_id: 3,
    steps: ["step1","step2","step3"],
    ingredients: [[2,1],[7,1],[6,1]],
    group: 2,
    cost: 20,
    unit_cost: 10,
    likes: 866,
    meal_type: "Dinner",
    cuisine_type: "Mediterranean",
    feature_type: "MeatLover",
    restrictions: ["Meat"],
    recipe_tags: "GoldenRecipe"
})
recipesCollection.insert({
    recipe_id: 9,
    name: "roast beef",
    member_id: 9,
    steps: ["step1","step2","step3"],
    ingredients: [[2,1],[7,1],[6,1]],
    group: 1,
    cost: 20,
    unit_cost: 20,
    likes: 86679,
    meal_type: "Dinner",
    cuisine_type: "Italian",
    feature_type: "MeatLover",
    restrictions: ["Meat"],
    recipe_tags: "Popular"
})

recipesCollection.insert({
    recipe_id: 10,
    name: "supreme steak",
    member_id: 4,
    steps: ["step1","step2","step3","step4"],
    ingredients: [[6,1],[1,1],[2,1]],
    group: 2,
    cost: 30,
    unit_cost: 15,
    likes: 18462,
    meal_type: "Dinner",
    cuisine_type: "Spanish",
    feature_type: "MeatLover",
    restrictions: ["Egg","Meat"],
    recipe_tags: "CostEffective"
})